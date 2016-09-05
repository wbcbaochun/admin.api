'use strict';

module.exports = function(sequelize, DataTypes) {
    let permission = sequelize.define('permission', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
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
                permission.belongsTo(models.role, { onDelete: 'cascade'});
            }
        }
    });
    return permission;
};
