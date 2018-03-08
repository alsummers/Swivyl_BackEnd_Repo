'use strict';
module.exports = (sequelize, DataTypes) => {
  var entity = sequelize.define('entity', {
    entity_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
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