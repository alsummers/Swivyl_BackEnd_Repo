'use strict';
module.exports = (sequelize, DataTypes) => {
    var shareholders = sequelize.define('shareholders', {

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
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ownership: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },


    }, {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                }
            }
        });

    return shareholders;
};