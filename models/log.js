'use strict';
module.exports = (sequelize, DataTypes) => {
  var log = sequelize.define('log', {
    uid:{
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    clientUid: {
        type: DataTypes.UUID,
        allowNull: true
      },
    companyId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return log;
};