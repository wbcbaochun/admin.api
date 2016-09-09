'use strict';

module.exports = function(sequelize, DataTypes) {
    let role = sequelize.define('role', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        memo: {
            type: DataTypes.STRING
        } 
    }, {
        classMethods: {
            associate: function(models) {
                role.hasMany(models.permission, { onDelete: 'cascade'});
            }
        }
    });
    return role;
};
