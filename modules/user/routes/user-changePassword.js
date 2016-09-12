'use strict';

/**
 * API：用户修改密码
 */
const co = require('co');
const baseRouter = require('common/router/baseRouter');
const models = require('models');
const api = require('common/api/api');
const encodeHelper = require('base/encode/encodeHelper');
const validationHelper = require('base/validation/validationHelper');

const VALIDATE_SCHEMA = {
    'oldPassword': {
        notEmpty: true,
        isLength: {
            options: [{ min: 4 }]
        },
        isAlphanumeric: true
    },
    'newPassword': {
        notEmpty: true,
        isLength: {
            options: [{ min: 4 }]
        },
        isAlphanumeric: true
    }
};

function controller(req) {
    // 输入验证
    let checkResult = validationHelper.validate(VALIDATE_SCHEMA, req);
    if (checkResult) {
        return checkResult;
    }

    let currentUser = req.currentUser;

    // 入力值取得
    let oldPassword = encodeHelper.md5(req.body.oldPassword);
    let newPassword = encodeHelper.md5(req.body.newPassword);

    // 查看用户并更新密码
    return co(function*() {
        let userDb = yield models.user.findOne({
            where: {
                id: currentUser.id
            }
        });

        if (userDb.password !== oldPassword) {
            return api.failed('error.user.oldPassword');
        }

        userDb.password = newPassword;
        yield userDb.save();

        return api.succeed('success.user.changePassword');
    });
}

let router = baseRouter('/user/changePassword', controller);

module.exports = router;
