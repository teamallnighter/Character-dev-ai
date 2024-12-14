const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const characters = sequelize.define(
    'characters',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  characters.associate = (db) => {
    db.characters.belongsToMany(db.traits, {
      as: 'traits',
      foreignKey: {
        name: 'characters_traitsId',
      },
      constraints: false,
      through: 'charactersTraitsTraits',
    });

    db.characters.belongsToMany(db.scenarios, {
      as: 'scenarios',
      foreignKey: {
        name: 'characters_scenariosId',
      },
      constraints: false,
      through: 'charactersScenariosScenarios',
    });

    db.characters.belongsToMany(db.versions, {
      as: 'versions',
      foreignKey: {
        name: 'characters_versionsId',
      },
      constraints: false,
      through: 'charactersVersionsVersions',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.characters.hasMany(db.versions, {
      as: 'versions_character',
      foreignKey: {
        name: 'characterId',
      },
      constraints: false,
    });

    //end loop

    db.characters.belongsTo(db.users, {
      as: 'creator',
      foreignKey: {
        name: 'creatorId',
      },
      constraints: false,
    });

    db.characters.hasMany(db.file, {
      as: 'image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.characters.getTableName(),
        belongsToColumn: 'image',
      },
    });

    db.characters.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.characters.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return characters;
};
