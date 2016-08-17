/**
 * Validation的帮助类
 */
'use strict';

const messageHelper = require('base/message/messageHelper');

const MESSAGE_KEY = 'errorMessage';

/**
 * 扩展validation schema
 * -> 向schema追加message, 根据'errors.{rule名}'从message定义里获得
 * @param  {Object} schema [参考express-validator的schema定义]
 * @return {Object}        [扩展后的schema]
 */
function extendSchema(schema) {
	for (let keyItem of Object.keys(schema)) {
		let rules = schema[keyItem];
		for (let keyRule of Object.keys(rules)) {
			let rule = rules[keyRule];
			let isObject = (typeof(rule) === 'object');
			let isMsgDefined = (isObject && rule[MESSAGE_KEY]);
			if (!isMsgDefined) {
				let msg = messageHelper.getMessage(`error.${keyRule}`);
				if (msg) {
					rule = isObject ? rule : {};
					rule[MESSAGE_KEY] = msg;
					rules[keyRule] = rule;
				}
			}
		}
	}

	return schema;
}

/**
 * 执行验证，如果发生错误则向Response中写入错误消息
 * @param  {Object} schema [参考express-validator的schema定义]
 * @param  {request} req    [express request]
 * @param  {response} res    [express response]
 * @return {Object}        [错误内容，参考express-validator的errors]
 */
function validate(schema, req) {
	var schemaExt = extendSchema(schema);
	req.checkBody(schemaExt);
	var errors = req.validationErrors();
    if (errors) {
        return Promise.resolve({
            status: 1,
            message: messageHelper.getMessage('error.input.error'),
            errors: errors
        });
    } else {
        return null;
    }	
}

var validationHelper = {
	extendSchema,
	validate
};

module.exports = validationHelper;