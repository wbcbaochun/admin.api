'use strict';

const _ = require('lodash');
const messageHelper = require('base/message/messageHelper');

const STATUS_FAILED = 1;
const STATUS_SUCCESSED = 0;

function _processResult(resultBody) {
    if (resultBody) {
        resultBody.message = messageHelper.getMessage(resultBody.message);
    }    
}

/**
 * API成功, 设置Response返回
 * @param  {string or object} args[0]  message 或者 result body
 *         {[object]}         args[1]  result body
 * @return {object}         成功消息体
 */
var succeed = function(...args) {
    let resultBody = {};
    if (args.length === 1) {
        if (typeof(args[0]) === 'object') {
            resultBody.result = args[0];
        } else {
            resultBody.message = args[0];   
        }
    } else if (args.length === 2) {  
        resultBody.message = args[0];
        resultBody.result = args[1];
    }   

    _processResult(resultBody);
    return _.merge({
        status: STATUS_SUCCESSED
    }, resultBody);
};


/**
 * API失败, 设置Response返回
 * @param  {string or object} args[0]  message 或者 result body
 * @return {object}         失败消息体
 */
var failed = function(...args) {
    let resultBody = {};
    if (args.length === 1) {
        if (typeof(args[0]) === 'object') {
            resultBody = args[0];
        } else {
            resultBody.message = args[0];
        }
    }
    _processResult(resultBody);   

    return _.merge({
        status: STATUS_FAILED,
        message: messageHelper.getMessage('error.process')
    }, resultBody);
};

var api = {
    succeed,
    failed
};

module.exports = api;
