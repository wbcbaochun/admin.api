'use strict';

const _ = require('lodash');

/**
 * 消息帮助类
 * 
 * 1.首次使用前先调用setup（仅需要调用一次）
 * 2.之后使用instance来获得单实例
 */
class MessageHelper {
    constructor(messages) {
        this.messages = messages;
    }

    static getMessage(key, ...params) {
        let result = this._instance().messages[key];
        if (!result) {
            return key;
        }

        if (params.length === 0) {
            return result;
        }

        for (let i = 0; i < params.length; i++) {
            result = result.replace('${' + i + '}', params[i]);
        }

        return result;
    }

    static setup(messages, appModules) {
        let appMessages = _.chain(_.values(appModules))
            .map('constants.messages')
            .reduce(function(result, value) {
                return _.assign(result, value);
            }, {})
            .value();
        let allMessages = _.merge(messages, appMessages);
        this.singleton = new MessageHelper(allMessages);
        return this.singleton;
    }

    static _instance() {
        return this.singleton;
    }    
}

module.exports = MessageHelper;
