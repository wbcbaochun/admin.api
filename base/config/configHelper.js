'use strict';

var env       = process.env.NODE_ENV || 'development';
var config    = require('config/config.json')[env];
var authConfigs = require('config/auth');
var sysConfigs = require('config/sysconfig');

module.exports = {
	// 环境配置
	getConfig: function(key) {
		return config[key];
	},
	getConfigs: function() {
		return config;
	},
	// 系统配置
	getSysConfig: function(key) {
		return sysConfigs[key];
	},
	// 权限配置
	getAuthConfig: function(key) {
		return authConfigs[key];
	}
};
