'use strict';

/**
 * API：用户login
 */
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

    // 执行Login
    return models.user.findOne({
        attributes: { exclude: ['password'] },
        where: {
            mail: name,
            password: password
        }
    }).then(function(user) {
        if (!user) {
            return api.failed('error.session.login');
        }
        tokenHelper.createToken(user.dataValues, res);
        return api.succeed('success.session.login', user);
    });
}

let router = baseRouter('/session/login', controller);

module.exports = router;
