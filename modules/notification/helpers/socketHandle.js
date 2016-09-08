'use strict';

const _ = require('lodash');
const logger = require('base/logger/loggerHelper').getLogger(__filename);
const models = require('models');
const socketHelper = require('base/socket/socketHelper');

let users = {};

function socketHandle(socket) {
	function _login(userId) {
		logger.debug(`【socket】user logined. userId = ${userId}`);
		users[userId] = socket;
		_getNotifications();
	}

	function _getNotifications() {
		_.forEach(users, (socket, userId) => {
			models.notification.count({
				where: {
					userId: userId,
					isRead: false
				}
			}).then(function(count) {
				if (count > 0) {
					socket.emit('notification', count);
				}
			});
		});
	}

	socket.on('login', _login);
}

socketHelper.addHandle(socketHandle);

module.exports = socketHandle;
