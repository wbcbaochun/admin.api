'use strict';

module.exports = function(sequelize, DataTypes) {
    let permission = sequelize.define('permission', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                permission.belongsTo(models.role, { onDelete: 'cascade'});
            }
        }
    });
    return permission;
};
