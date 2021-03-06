'use strict';

/**
 * API：用户更新
 */
const baseRouter = require('common/router/baseRouter');
const models = require('models');
const api = require('common/api/api');
const validationHelper = require('base/validation/validationHelper');

const VALIDATE_SCHEMA = {
    'name': {
        notEmpty: true
    },
    'mail': {
        notEmpty: true,
        isEmail: true
    }
};

function controller(req) {
    // 输入验证
    let checkResult = validationHelper.validate(VALIDATE_SCHEMA, req);
    if (checkResult) {
        return checkResult;
    }

    // 编辑数据
    let user = req.body;

    // 更新数据
    return models.user.findById(user.id)
        .then(dbUser => dbUser.update(user))
        .then(() => api.succeed('success.update'));
}

let router = baseRouter('/user/update', controller);
module.exports = router;
