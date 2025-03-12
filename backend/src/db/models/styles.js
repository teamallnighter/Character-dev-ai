const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const styles = sequelize.define(
    'styles',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      Name: {
        type: DataTypes.TEXT,
      },

      Description: {
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

  styles.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.styles.hasMany(db.physicalttraits, {
      as: 'physicalttraits_Style',
      foreignKey: {
        name: 'StyleId',
      },
      constraints: false,
    });

    //end loop

    db.styles.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.styles.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return styles;
};
