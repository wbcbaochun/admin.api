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
        },
        createUserId: {
            type: DataTypes.BIGINT(11),
            allowNull: false,
            defaultValue: '0'
        },
        updateUserId: {
            type: DataTypes.BIGINT(11),
            allowNull: false,
            defaultValue: '0'
        }        
    }, {
        paranoid: true,
        classMethods: {
            associate: function(models) {
                role.hasMany(models.permission, { onDelete: 'cascade'});
            }
        }
    });
    return role;
};
