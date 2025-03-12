const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class StylesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const styles = await db.styles.create(
      {
        id: data.id || undefined,

        Name: data.Name || null,
        Description: data.Description || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return styles;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const stylesData = data.map((item, index) => ({
      id: item.id || undefined,

      Name: item.Name || null,
      Description: item.Description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const styles = await db.styles.bulkCreate(stylesData, { transaction });

    // For each item created, replace relation files

    return styles;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const styles = await db.styles.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.Name !== undefined) updatePayload.Name = data.Name;

    if (data.Description !== undefined)
      updatePayload.Description = data.Description;

    updatePayload.updatedById = currentUser.id;

    await styles.update(updatePayload, { transaction });

    return styles;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const styles = await db.styles.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of styles) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of styles) {
        await record.destroy({ transaction });
      }
    });

    return styles;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const styles = await db.styles.findByPk(id, options);

    await styles.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await styles.destroy({
      transaction,
    });

    return styles;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const styles = await db.styles.findOne({ where }, { transaction });

    if (!styles) {
      return styles;
    }

    const output = styles.get({ plain: true });

    output.physicalttraits_Style = await styles.getPhysicalttraits_Style({
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

    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.Name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('styles', 'Name', filter.Name),
        };
      }

      if (filter.Description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('styles', 'Description', filter.Description),
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
      const { rows, count } = await db.styles.findAndCountAll(queryOptions);

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
          Utils.ilike('styles', 'id', query),
        ],
      };
    }

    const records = await db.styles.findAll({
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
