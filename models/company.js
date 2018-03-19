'use strict';
module.exports = (sequelize, DataTypes) => {
  var company = sequelize.define('company', {
    uid:{
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    img: {
      type: DataTypes.BLOB,
      allowNull: true,
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