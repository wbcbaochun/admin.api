'use strict';

/**
 * API：用户新增
 */
const baseRouter = require('common/router/baseRouter');
const models = require('models');
const api = require('common/api/api');
const encodeHelper = require('base/encode/encodeHelper');
const validationHelper = require('base/validation/validationHelper');

const VALIDATE_SCHEMA = {
    'name': {
        notEmpty: true
    },
    'password': {
        notEmpty: true,
        isLength: {
            options: [{ min: 6 }]
        }
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
    user.password = encodeHelper.md5(user.password);

    // 更新数据
    return models.user.create(user)
            .then(function() {
                return api.succeed('success.save');
            });
}

let router = baseRouter('/user/create', controller);
module.exports = router;
