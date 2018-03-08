'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('company', {
    id:{
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owmer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
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

  return company;
};