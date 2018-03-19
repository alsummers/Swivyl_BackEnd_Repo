'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    uid:{
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$",'i'],  
        msg: "name must contain characters"
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 5,
          msg: 'Password must have more than 5 characters and contain no spaces.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already in use'
      },
      validate: {
        isEmail: {
          args: true, 
          msg: "Must be a valid email"
        }
      }
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
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return users;
};