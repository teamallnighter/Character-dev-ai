const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PhysicalttraitsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const physicalttraits = await db.physicalttraits.create(
      {
        id: data.id || undefined,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await physicalttraits.setStyle(data.Style || null, {
      transaction,
    });

    return physicalttraits;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const physicalttraitsData = data.map((item, index) => ({
      id: item.id || undefined,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const physicalttraits = await db.physicalttraits.bulkCreate(
      physicalttraitsData,
      { transaction },
    );

    // For each item created, replace relation files

    return physicalttraits;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const physicalttraits = await db.physicalttraits.findByPk(
      id,
      {},
      { transaction },
    );

    const updatePayload = {};

    updatePayload.updatedById = currentUser.id;

    await physicalttraits.update(updatePayload, { transaction });

    if (data.Style !== undefined) {
      await physicalttraits.setStyle(
        data.Style,

        { transaction },
      );
    }

    return physicalttraits;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const physicalttraits = await db.physicalttraits.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of physicalttraits) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of physicalttraits) {
        await record.destroy({ transaction });
      }
    });

    return physicalttraits;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const physicalttraits = await db.physicalttraits.findByPk(id, options);

    await physicalttraits.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await physicalttraits.destroy({
      transaction,
    });

    return physicalttraits;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const physicalttraits = await db.physicalttraits.findOne(
      { where },
      { transaction },
    );

    if (!physicalttraits) {
      return physicalttraits;
    }

    const output = physicalttraits.get({ plain: true });

    output.Style = await physicalttraits.getStyle({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.styles,
        as: 'Style',

        where: filter.Style
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.Style.split('|').map((term) =>
                      Utils.uuid(term),
                    ),
                  },
                },
                {
                  id: {
                    [Op.or]: filter.Style.split('|').map((term) => ({
                      [Op.iLike]: `%${term}%`,
                    })),
                  },
                },
              ],
            }
          : {},
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    const queryOptions = {
      where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.physicalttraits.findAndCountAll(
        queryOptions,
      );

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(query, limit, offset) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('physicalttraits', 'id', query),
        ],
      };
    }

    const records = await db.physicalttraits.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
