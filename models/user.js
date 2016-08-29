'use strict';

module.exports = function(sequelize, DataTypes) {
    let user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING,
            unique: true
        },
        photo: {
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
                user.belongsTo(models.role);
            }
        }
    });
    return user;
};
