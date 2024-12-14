const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CharactersDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const characters = await db.characters.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await characters.setCreator(data.creator || null, {
      transaction,
    });

    await characters.setTraits(data.traits || [], {
      transaction,
    });

    await characters.setScenarios(data.scenarios || [], {
      transaction,
    });

    await characters.setVersions(data.versions || [], {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.characters.getTableName(),
        belongsToColumn: 'image',
        belongsToId: characters.id,
      },
      data.image,
      options,
    );

    return characters;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const charactersData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const characters = await db.characters.bulkCreate(charactersData, {
      transaction,
    });

    // For each item created, replace relation files

    for (let i = 0; i < characters.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.characters.getTableName(),
          belongsToColumn: 'image',
          belongsToId: characters[i].id,
        },
        data[i].image,
        options,
      );
    }

    return characters;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const characters = await db.characters.findByPk(id, {}, { transaction });

    await characters.update(
      {
        name: data.name || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await characters.setCreator(data.creator || null, {
      transaction,
    });

    await characters.setTraits(data.traits || [], {
      transaction,
    });

    await characters.setScenarios(data.scenarios || [], {
      transaction,
    });

    await characters.setVersions(data.versions || [], {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.characters.getTableName(),
        belongsToColumn: 'image',
        belongsToId: characters.id,
      },
      data.image,
      options,
    );

    return characters;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const characters = await db.characters.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of characters) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of characters) {
        await record.destroy({ transaction });
      }
    });

    return characters;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const characters = await db.characters.findByPk(id, options);

    await characters.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await characters.destroy({
      transaction,
    });

    return characters;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const characters = await db.characters.findOne({ where }, { transaction });

    if (!characters) {
      return characters;
    }

    const output = characters.get({ plain: true });

    output.versions_character = await characters.getVersions_character({
      transaction,
    });

    output.image = await characters.getImage({
      transaction,
    });

    output.creator = await characters.getCreator({
      transaction,
    });

    output.traits = await characters.getTraits({
      transaction,
    });

    output.scenarios = await characters.getScenarios({
      transaction,
    });

    output.versions = await characters.getVersions({
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
        model: db.users,
        as: 'creator',
      },

      {
        model: db.traits,
        as: 'traits',
        through: filter.traits
          ? {
              where: {
                [Op.or]: filter.traits.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.traits ? true : null,
      },

      {
        model: db.scenarios,
        as: 'scenarios',
        through: filter.scenarios
          ? {
              where: {
                [Op.or]: filter.scenarios.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.scenarios ? true : null,
      },

      {
        model: db.versions,
        as: 'versions',
        through: filter.versions
          ? {
              where: {
                [Op.or]: filter.versions.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.versions ? true : null,
      },

      {
        model: db.file,
        as: 'image',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('characters', 'name', filter.name),
        };
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

      if (filter.creator) {
        const listItems = filter.creator.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          creatorId: { [Op.or]: listItems },
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
          count: await db.characters.count({
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
      : await db.characters.findAndCountAll({
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
          Utils.ilike('characters', 'name', query),
        ],
      };
    }

    const records = await db.characters.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
