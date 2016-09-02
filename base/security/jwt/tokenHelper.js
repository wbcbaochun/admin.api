'use strict';

const jwt = require('jsonwebtoken');
const _ = require('lodash');

const DEFAULT_EXPIRESIN = '1 days';
const DEFAULT_TOKEN_KEY = 'x-access-token';

/**
 * Token帮助类
 * 
 * 1.首次使用前先调用setup（仅需要调用一次）
 * 2.之后使用instance来获得单实例
 */
class TokenHelper {
    constructor(jwsKey, opts) {
        this.tokenKey = opts.tokenKey || DEFAULT_TOKEN_KEY;
        this.jwsKey = jwsKey;
        this.jwsOptions = opts.jwsOptions || {
            expiresIn: DEFAULT_EXPIRESIN
        };
    }

    /**
     * 创建Token
     * @param  {Object} tokenValues [创建Token用的对象]
     * @param  {response} res       [express response]
     * @param  {Object} opts        [jws token key的生成options]
     * @return {[type]}             [description]
     */
    static createToken(tokenValues, res, jwtOptions = {}) {
        return this._instance()._createToken(tokenValues, res, jwtOptions);
    }

    static clearToken(res) {
        res.setHeader(this._instance().tokenKey, '');
    }

    static setup(jwsKey, opts = {}) {
        this.singleton = new TokenHelper(jwsKey, opts);
        return this.singleton;
    }

    static _instance() {
        return this.singleton;
    }

    _createToken(tokenValues, res, jwtOptions = {}) {
        let margedJwtOpts = Object.assign({}, this.jwsOptions, jwtOptions);
        let tokenValuesNoExp = _.omit(tokenValues, ['iat', 'exp']);
        let newtoken = jwt.sign(tokenValuesNoExp, this.jwsKey, margedJwtOpts);
        res.setHeader(this.tokenKey, newtoken);
        return newtoken;
    }


}

module.exports = TokenHelper;
