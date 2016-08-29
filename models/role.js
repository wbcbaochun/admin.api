'use strict';

module.exports = function(sequelize, DataTypes) {
    var role = sequelize.define('role', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                role.hasMany(models.permission);
            }
        }
    });
    return role;
};