'use strict';

/**
 * API：用户login
 */
const co = require('co');
const baseRouter = require('common/router/baseRouter');
const models = require('models');
const api = require('common/api/api');
const encodeHelper = require('base/encode/encodeHelper');
const tokenHelper = require('base/security/jwt/tokenHelper');
const validationHelper = require('base/validation/validationHelper');

const VALIDATE_SCHEMA = {
    'name': {
        notEmpty: true
    },
    'password': {
        notEmpty: true
    }
};

function controller(req, res) {
    // 输入验证
    let checkResult = validationHelper.validate(VALIDATE_SCHEMA, req);
    if (checkResult) {
        return checkResult;
    }

    // 入力值取得
    let name = req.body.name;
    let password = encodeHelper.md5(req.body.password);

    //  执行Login
    return co(function*() {
        // 取得用户
        let user = yield models.user.findOne({
            attributes: { exclude: ['password'] },
            where: {
                mail: name,
                password: password
            }
        });
        if (!user) {
            return api.failed('error.session.login');
        }
        
        // 取得权限列表
        let permissions = yield models.permission.findAll({
            attributes: ['name'],
            where: {
                roleId: user.roleId
            }
        });

        // 设置结果
        let result = user.dataValues;
        result.permissions = permissions.map(item => item.name);
        tokenHelper.createToken(user.dataValues, res);
        return api.succeed('success.session.login', result);
    });
}

let router = baseRouter('/session/login', controller);

module.exports = router;
