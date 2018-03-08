'use strict';
module.exports = (sequelize, DataTypes) => {
  var log = sequelize.define('log', {
    id:{
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    companyID: {
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

  return log;
};