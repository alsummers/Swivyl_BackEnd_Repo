'use strict';
module.exports = (sequelize, DataTypes) => {
    var todo = sequelize.define('todo', {
        companyID: {
            type: DataTypes.STRING,
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

    }, {
            classMethods: {
                associate: function (models) {
                    // associations can be defined here
                }
            }
        });

    return todo;
};