'use strict';

const logger = require('base/logger/loggerHelper').getLogger(__filename);
const models = require('models');
const socketHelper = require('base/socket/socketHelper');
const constants = require('common/constant/constants');

// 默认轮询间隔
const DEFUALT_POLLING_INTERVAL = 5000;

let users = {};
let pollingInterval = constants.DEFUALT_POLLING_INTERVAL || DEFUALT_POLLING_INTERVAL;

function socketHandle(socket) {
	let pollingIntervalId;
	let loginUser;

	function _login(userId) {
		logger.debug(`【socket】user logined. userId = ${userId}`);
		users[userId] = socket;
		loginUser = userId;

		// 轮询消息
		pollingIntervalId = setInterval(() => _getNotifications(userId), pollingInterval);
		_getNotifications(userId);
	}

	function _getNotifications(userId) {
		logger.debug(`Get notification. UserId = ${userId}`);
		
		models.notification.count({
			where: {
				userId: userId,
				isRead: false
			}
		}).then(function(count) {
			socket.emit('notification', count);
		});
	}

	function _disconnect() {
		logger.debug(`【socket】disconnected. userId = ${loginUser}`);
		clearInterval(pollingIntervalId);
		delete users[loginUser];
	}

	socket.on('login', _login);
	socket.on('disconnect', _disconnect);
	socket.on('forceDisconnect', () => socket.disconnect());
}

socketHelper.addHandle(socketHandle);

module.exports = socketHandle;
