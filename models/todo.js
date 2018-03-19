'use strict';
module.exports = (sequelize, DataTypes) => {
    var todo = sequelize.define('todo', {
        uid:{
            type: DataTypes.UUID,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
        companyID: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        dateDue: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner: {
            type: DataTypes.UUID,
            allowNull: false,
          }

    }, {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                }
            }
        });

    return todo;
};