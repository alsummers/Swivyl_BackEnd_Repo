'use strict';
module.exports = (sequelize, DataTypes) => {
  var entity = sequelize.define('entity', {
    uid:{
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    entity_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    owner: {
      type: DataTypes.UUID,
      allowNull: false,
    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return entity;
};