'use strict';

/**
 * API：用户下载
 */
const baseRouter = require('common/router/baseRouter');
const models = require('models');
const api = require('common/api/api');
const userHelper = require('../helpers/userHelper');

function controller(req) {
    // 准备检索条件
    let queryOpts = userHelper.prepareQuery(req.body);

    // 执行检索
    return models.user.findAll(queryOpts)     
    .then(function(result) {
        if (result && result.length > 0) {
            return api.succeed(result);
        } else {
            return api.failed('error.query.nodata');
        }
    });
}

let router = baseRouter('/user/download', controller);

module.exports = router;
