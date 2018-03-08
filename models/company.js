'use strict';
module.exports = (sequelize, DataTypes) => {
  var company = sequelize.define('company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.UUID,
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