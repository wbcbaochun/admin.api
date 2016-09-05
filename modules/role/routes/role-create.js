'use strict';

/**
 * API：用户新增
 */
const baseRouter = require('common/router/baseRouter');
const models = require('models');
const api = require('common/api/api');
const validationHelper = require('base/validation/validationHelper');
const _ = require('lodash');

const VALIDATE_SCHEMA = {
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
    let role = _.cloneDeep(req.body);
    role.permissions = role.permissions.map(item => ({name: item}));

    // 更新数据
    return models.role.create(role, {
            include: [models.permission]
        })
        .then(function() {
            return api.succeed('success.save');
        });
}

let router = baseRouter('/role/create', controller);
module.exports = router;
