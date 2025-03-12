const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const physicalttraits = sequelize.define(
    'physicalttraits',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  physicalttraits.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.physicalttraits.belongsTo(db.styles, {
      as: 'Style',
      foreignKey: {
        name: 'StyleId',
      },
      constraints: false,
    });

    db.physicalttraits.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.physicalttraits.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return physicalttraits;
};
