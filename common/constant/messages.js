'use strict';

var baseMessages = {
	// -- validation errors --
	'error.isEmail': '邮箱地址不正确',
	'error.isUrl': 'URL地址不正确',
	'error.isIP': 'IP地址不正确',
	'error.isIPv4': 'IP地址不正确',
	'error.isIPv6': 'IP地址不正确',
	'error.isAlpha': '请输入英文',
	'error.isAlphanumeric': '请输入英文和数字',
	'error.isNumeric': '请输入数字',
	'error.isInt': '请输入整数',
	'error.isFloat': '请输入小数',
	'error.isDecimal': '请输入小数',
	'error.isLowercase': '请输入小写文字',
	'error.isUppercase': '请输入大写文字',
	'error.notNull': '请输入',
	'error.isNull': '只能为空',
	'error.notEmpty': '请输入',
	'error.len': '长度不正确',
	'error.isUUID': '请输入UUID',
	'error.isDate': '请输入正确的日期',
	'error.max': '输入的值太大',
	'error.min': '输入的值太小',
	'error.isArray': '请输入两个以上的值',
	'error.isCreditCard': '请输入正确的信用卡',
	'error.isLength': '输入的长度不正确。',
	'error.input.error': '输入的内容不正确',
	// -- global errors --
	'error.system.error': '发生系统错误',
	'error.fileUpload': '文件上传时发生错误，请重新上传。',
	'error.fileUpload.suffixs': '上传文件的格式错误。',
	'error.process': '处理失败',
	'error.data.notfound': '该数据不存在',
	'error.query.nodata': '检索结果不存在',
	'error.authCheck.token': '权限验证失败，您还未登录或登录超时',
	'error.authCheck.permission': '权限验证失败，您没有该操作的权限',
	// -- global success --
	'success.process': '处理成功',
	'success.update': '更新成功',
	'success.save': '保存成功',
	'success.delete': '删除成功'
};

module.exports = baseMessages;
