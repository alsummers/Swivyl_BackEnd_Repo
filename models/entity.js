'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('entity', {
    uid:{
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true
    },
    entityname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyid: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return entity;
};