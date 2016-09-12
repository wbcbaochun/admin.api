'use strict';

/**
 * API：用户更新
 */
const baseRouter = require('common/router/baseRouter');
const models = require('models');
const api = require('common/api/api');
const validationHelper = require('base/validation/validationHelper');
const co = require('co');

const VALIDATE_SCHEMA = {
    'id': {
        notEmpty: true
    },
    'name': {
        notEmpty: true
    },
    'memo': {
        isLength: {
            options: [{ max: 255 }]
        }
    }
};

function controller(req) {
    // 输入验证
    let checkResult = validationHelper.validate(VALIDATE_SCHEMA, req);
    if (checkResult) {
        return checkResult;
    }

    // 编辑数据
    let role = req.body;

    return co(function*() {
        // 删除现有权限
        yield models.permission.destroy({
            where: {
                roleId: role.id
            }
        });

        // 追加权限
        let permissions = role.permissions.map(
            item => ({ name: item, roleId:  role.id})
        );
        yield models.permission.bulkCreate(permissions);

        // 更新角色
        yield models.role.update(role, {
             where: {
                id: role.id
             },
             optimisticLock: true
        });

        return api.succeed('success.update');
    });
}

let router = baseRouter('/role/update', controller);
module.exports = router;
