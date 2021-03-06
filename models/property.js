'use strict';
module.exports = (sequelize, DataTypes) => {
  var properties = sequelize.define('properties', {
    uid:{
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    building_sprink: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    building_owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sqft_of_building: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    building_occ: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location_employees: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location_contents: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location_inventory: {
        type: DataTypes.INTEGER,
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

  return properties;
};