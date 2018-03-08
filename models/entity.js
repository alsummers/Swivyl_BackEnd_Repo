'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('entity', {
    entity_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
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