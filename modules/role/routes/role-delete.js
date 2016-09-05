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
    let pDeletePermissions = models.permission.destroy({ 
        where: {
            roleId: id
        }
    });
    let pDeleteRole = models.role.destroy({ 
        where: {
            id: id
        }
    }); 
    
    return Promise.all([pDeletePermissions, pDeleteRole])
        .then(function([countPermissions, countRole]) {
            if (countRole > 0) {
                return api.succeed('success.delete');
            } else {
                return api.failed('error.data.notfound');
            }
        });
}

let router = baseRouter('/role/delete', controller);
module.exports = router;
