'use strict';

module.exports = function(sequelize, DataTypes) {
    let permission = sequelize.define('permission', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true
    });
    return permission;
};
