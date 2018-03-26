'use strict';
module.exports = (sequelize, DataTypes) => {
  var fleets = sequelize.define('fleets', {
    uid:{
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
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
        type: DataTypes.STRING,
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
        allowNull: true
    },
    titled_to: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entityId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false
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

  return fleets;
};