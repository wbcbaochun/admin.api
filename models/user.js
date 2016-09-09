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
        }
    }, {
        classMethods: {
            associate: function(models) {
                user.belongsTo(models.role);
                user.hasMany(models.notification);
            }
        }
    });
    return user;
};
