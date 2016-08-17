'use strict';

/**
 * API：用户logout
 */
const baseRouter = require('common/router/baseRouter');
const api = require('common/api/api');
const tokenHelper = require('base/security/jwt/tokenHelper');

function controller(req, res) {
	// 清除token
	tokenHelper.clearToken(res);
	return api.succeed('success.session.logout');
}

let router = baseRouter('/session/logout', controller);

module.exports = router;