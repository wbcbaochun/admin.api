'use strict';

const api = require('common/api/api');
const constants = require('common/constant/constants');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const configHelper = require('base/config/configHelper');
const tokenHelper = require('base/security/jwt/tokenHelper');
const _ = require('lodash');
const permessionMaps = require('config/permissionMaps');

const AUTH_KEY_ANNO = 'anon';	

function _setTokenError(res) {
	let result = api.failed({
		errorcd: constants.TOKEN_ERROR_CODE,
		message: 'error.authCheck.token'
	});
	return res.status(403).send(result);
}

function _setPermissionError(res) {
	let result = api.failed({
		errorcd: constants.PERMISSION_ERROR_CODE,
		message: 'error.authCheck.permission'
	});
	return res.status(403).send(result);
}

function _isPassCheck() {
	return configHelper.getConfig('passCheckAuth');
}

/**
 * 验证用户的action权限
 * @param  {String} url         [当前url]
 * @param  {Object} currentUser [当前用户]
 * @return {boolean}             [是否有权限]
 */
function _checkPermission(url, currentUser) {
	let result = false;
	_.some(permessionMaps, (value, key) => {
		if (url.match(key)) {
			if (currentUser.permissions.indexOf(value) >= 0) {
				result = true;
			}
			return true;
		}
	});
	return result;
}

function AuthVerify(req, res, next) {
	// 是否跳过验证
	if (_isPassCheck()) {
		next();
		return;
	}

	// 检查当前url是否需要认证
	let anonList = configHelper.getAuthConfig(AUTH_KEY_ANNO);
	let url = _.replace(req.url, '/api', '');
	if(_.indexOf(anonList, url) >= 0) {
		next();
		return;
	}

	// 取得token
	let token = req.headers[constants.USER_TOKEN_KEY];
	// decode token
	if(token) {
		// verifies secret and checks exp
		jwt.verify(token, constants.JWS_TOKEN_KEY, function(err, decoded) {
			if(err) {
				return _setTokenError(res);
			} else {
				// permission check
				let hasPermission =  _checkPermission(url, decoded);
				if (!hasPermission) {
					return _setPermissionError(res);
				}

				// if everything is good, save to request for use in other routes
				req.currentUser = decoded;
				tokenHelper.createToken(decoded, res);
				next();
			}
		});
	} else {
		// if there is no token
		// return an error
		return _setTokenError(res);
	}
}

module.exports = AuthVerify;