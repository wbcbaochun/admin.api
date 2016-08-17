'use strict';

/**
 * API：用户删除
 */
const baseRouter = require('common/router/baseRouter');
const models = require('models');
const api = require('common/api/api');

function controller(req) {
	let id = req.body.id;
    // 删除数据
    return models.user.destroy({
    	where: {id : id}
    })
    .then(function(count) {
    	if (count > 0) {
    		return api.succeed('success.delete');
    	} else {
    		return api.failed('error.data.notfound');
    	}
    });
}

let router = baseRouter('/user/delete', controller);
module.exports = router;
