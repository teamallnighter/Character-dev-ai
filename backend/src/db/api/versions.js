const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class VersionsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const versions = await db.versions.create(
      {
        id: data.id || undefined,

        version_number: data.version_number || null,
        created_on: data.created_on || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await versions.setCharacter(data.character || null, {
      transaction,
    });

    return versions;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const versionsData = data.map((item, index) => ({
      id: item.id || undefined,

      version_number: item.version_number || null,
      created_on: item.created_on || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const versions = await db.versions.bulkCreate(versionsData, {
      transaction,
    });

    // For each item created, replace relation files

    return versions;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const versions = await db.versions.findByPk(id, {}, { transaction });

    await versions.update(
      {
        version_number: data.version_number || null,
        created_on: data.created_on || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await versions.setCharacter(data.character || null, {
      transaction,
    });

    return versions;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const versions = await db.versions.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of versions) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of versions) {
        await record.destroy({ transaction });
      }
    });

    return versions;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const versions = await db.versions.findByPk(id, options);

    await versions.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await versions.destroy({
      transaction,
    });

    return versions;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const versions = await db.versions.findOne({ where }, { transaction });

    if (!versions) {
      return versions;
    }

    const output = versions.get({ plain: true });

    output.character = await versions.getCharacter({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.characters,
        as: 'character',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.version_number) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'versions',
            'version_number',
            filter.version_number,
          ),
        };
      }

      if (filter.created_onRange) {
        const [start, end] = filter.created_onRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            created_on: {
              ...where.created_on,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            created_on: {
              ...where.created_on,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.character) {
        const listItems = filter.character.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          characterId: { [Op.or]: listItems },
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

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.versions.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.versions.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('versions', 'version_number', query),
        ],
      };
    }

    const records = await db.versions.findAll({
      attributes: ['id', 'version_number'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['version_number', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.version_number,
    }));
  }
};
