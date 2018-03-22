'use strict';
module.exports = (sequelize, DataTypes) => {
    var shareholders = sequelize.define('shareholders', {
        uid:{
            type: DataTypes.UUID,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ownership: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        companyId: {
            type: DataTypes.INTEGER,
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

    return shareholders;
};