'use strict';

var api = require('common/api/api');
var constants = require('common/constant/constants');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var configHelper = require('base/config/configHelper');
var tokenHelper = require('base/security/jwt/tokenHelper');
var _ = require('lodash');

const AUTH_KEY_ANNO = 'anon';	

function _setTokenError(res) {
	var result = api.failed({
		errorcd: constants.TOKEN_ERROR_CODE,
		message: 'token验证失败，您还未登录或登录超时'
	});
	return res.status(403).send(result);
}

function _isPassCheck() {
	return configHelper.getConfig('passCheckAuth');
}

function AuthVerify(req, res, next) {
	// 是否跳过验证
	if (_isPassCheck()) {
		next();
		return;
	}

	// 检查当前url是否需要认证
	var anonList = configHelper.getAuthConfig(AUTH_KEY_ANNO);
	var url = _.replace(req.url, '/api', '');
	if(_.indexOf(anonList, url) >= 0) {
		next();
		return;
	}

	// 取得token
	var token = req.headers[constants.USER_TOKEN_KEY];

	// decode token
	if(token) {
		// verifies secret and checks exp
		jwt.verify(token, constants.JWS_TOKEN_KEY, function(err, decoded) {
			if(err) {
				return _setTokenError(res);
			} else {
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