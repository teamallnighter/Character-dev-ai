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
        Description: data.Description || null,
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
      Description: item.Description || null,
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

    const updatePayload = {};

    if (data.name !== undefined) updatePayload.name = data.name;

    if (data.Description !== undefined)
      updatePayload.Description = data.Description;

    updatePayload.updatedById = currentUser.id;

    await characters.update(updatePayload, { transaction });

    if (data.creator !== undefined) {
      await characters.setCreator(
        data.creator,

        { transaction },
      );
    }

    if (data.traits !== undefined) {
      await characters.setTraits(data.traits, { transaction });
    }

    if (data.scenarios !== undefined) {
      await characters.setScenarios(data.scenarios, { transaction });
    }

    if (data.versions !== undefined) {
      await characters.setVersions(data.versions, { transaction });
    }

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
    let where = {};
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.users,
        as: 'creator',

        where: filter.creator
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.creator
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  firstName: {
                    [Op.or]: filter.creator
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

      {
        model: db.traits,
        as: 'traits',
      },

      {
        model: db.scenarios,
        as: 'scenarios',
      },

      {
        model: db.versions,
        as: 'versions',
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

      if (filter.Description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'characters',
            'Description',
            filter.Description,
          ),
        };
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.traits) {
        const searchTerms = filter.traits.split('|');

        include = [
          {
            model: db.traits,
            as: 'traits_filter',
            required: searchTerms.length > 0,
            where:
              searchTerms.length > 0
                ? {
                    [Op.or]: [
                      {
                        id: {
                          [Op.in]: searchTerms.map((term) => Utils.uuid(term)),
                        },
                      },
                      {
                        description: {
                          [Op.or]: searchTerms.map((term) => ({
                            [Op.iLike]: `%${term}%`,
                          })),
                        },
                      },
                    ],
                  }
                : undefined,
          },
          ...include,
        ];
      }

      if (filter.scenarios) {
        const searchTerms = filter.scenarios.split('|');

        include = [
          {
            model: db.scenarios,
            as: 'scenarios_filter',
            required: searchTerms.length > 0,
            where:
              searchTerms.length > 0
                ? {
                    [Op.or]: [
                      {
                        id: {
                          [Op.in]: searchTerms.map((term) => Utils.uuid(term)),
                        },
                      },
                      {
                        title: {
                          [Op.or]: searchTerms.map((term) => ({
                            [Op.iLike]: `%${term}%`,
                          })),
                        },
                      },
                    ],
                  }
                : undefined,
          },
          ...include,
        ];
      }

      if (filter.versions) {
        const searchTerms = filter.versions.split('|');

        include = [
          {
            model: db.versions,
            as: 'versions_filter',
            required: searchTerms.length > 0,
            where:
              searchTerms.length > 0
                ? {
                    [Op.or]: [
                      {
                        id: {
                          [Op.in]: searchTerms.map((term) => Utils.uuid(term)),
                        },
                      },
                      {
                        version_number: {
                          [Op.or]: searchTerms.map((term) => ({
                            [Op.iLike]: `%${term}%`,
                          })),
                        },
                      },
                    ],
                  }
                : undefined,
          },
          ...include,
        ];
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
      const { rows, count } = await db.characters.findAndCountAll(queryOptions);

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
          Utils.ilike('characters', 'name', query),
        ],
      };
    }

    const records = await db.characters.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
