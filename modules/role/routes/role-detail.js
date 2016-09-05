'use strict';
/**
 * API: 角色详情
 * @type {[type]}
 */

const models = require('models');
const api = require('common/api/api');
const baseRouter = require('common/router/baseRouter');

function controller(req) {
    // 编辑数据
    let id = req.body.id;

    // 检索数据
    return models.role.findById(id, {
        include: [{
            model: models.permission,
            attributes: ['name']
        }]
    })
    .then(function(role) {
    	if (role) {
            let result = role.dataValues;
            result.permissions = result.permissions.map(item => item.name);

    		return api.succeed(result);
    	} else {
    		return api.failed('error.data.notfound');
    	}
    });      
}

let router = baseRouter('/role/detail', controller);
module.exports = router;
