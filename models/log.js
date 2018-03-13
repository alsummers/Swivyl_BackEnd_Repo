'use strict';
module.exports = (sequelize, DataTypes) => {
  var log = sequelize.define('log', {
    clientUid: {
        type: DataTypes.UUID,
        allowNull: true
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