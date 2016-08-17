'use strict';

var codelist = require('./codelist');

var constants = {
	// token验证失败CODE
	TOKEN_ERROR_CODE: 99,
	// 用户权限验证失败CODE
	NO_USER_ERROR_CODE: 98,
	// api调用成功
	API_RETURN_SUCCESS: 0,
	// api调用失败
	API_RETURN_FAIL: 1,
	// 过滤字段
	NO_SHOW_FIELDS:['createUserId','createDatetime','updateUserId','deleteFlg'],
	// 系统默认用户id
	SYS_DEFAULT_USER_ID: '0',
	// JWS TOKEN 秘钥
	ENCODE_UTF_8: 'utf-8',
	// JWS TOKEN 秘钥 header key
	USER_TOKEN_KEY: 'x-access-token',
	// JWS TOKEN 秘钥 过期时间
	USER_TOKEN_EXPIRES: '1 days',
	// JWS TOKEN 秘钥
	JWS_TOKEN_KEY: 'admin',
	// CODE LIST
	CODE_LIST : codelist
};



module.exports = constants;