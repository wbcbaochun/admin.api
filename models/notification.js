'use strict';

module.exports = function(sequelize, DataTypes) {
    let notification = sequelize.define('notification', {
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return notification;
};
