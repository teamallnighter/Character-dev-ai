const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const versions = sequelize.define(
    'versions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      version_number: {
        type: DataTypes.TEXT,
      },

      created_on: {
        type: DataTypes.DATE,
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

  versions.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.versions.belongsTo(db.characters, {
      as: 'character',
      foreignKey: {
        name: 'characterId',
      },
      constraints: false,
    });

    db.versions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.versions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return versions;
};
