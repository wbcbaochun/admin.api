'use strict';
/**
 * API: 用户详情
 * @type {[type]}
 */

const models = require('models');
const api = require('common/api/api');
const baseRouter = require('common/router/baseRouter');

function controller(req) {
    // 编辑数据
    let id = req.body.id;

    // 检索数据
    return models.user.findById(id)
        .then(function(user) {
        	if (user) {
        		return api.succeed(user);
        	} else {
        		return api.failed('error.data.notfound');
        	}
        });      
}

let router = baseRouter('/user/detail', controller);
module.exports = router;
