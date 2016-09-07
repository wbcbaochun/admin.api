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
        paranoid: true
    });
    return notification;
};
