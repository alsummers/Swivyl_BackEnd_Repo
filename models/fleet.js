'use strict';
module.exports = (sequelize, DataTypes) => {
  var fleets = sequelize.define('fleets', {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    make: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vin_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    driver: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    garaging_zip: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_added: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titled_to: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entityId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return fleets;
};