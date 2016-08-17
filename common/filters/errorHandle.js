'use strict';

const logger = require('base/logger/loggerHelper').getLogger(__filename);
const messageHelper = require('base/message/messageHelper');

function errorHandle(err, req, res, next) {
	/*jshint unused: false */
	logger.error(err);
	res.status(500).send(messageHelper.getMessage('error.system.error'));
}

module.exports = errorHandle;
