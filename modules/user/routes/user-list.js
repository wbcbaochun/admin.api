'use strict';

/**
 * API：用户列表
 */
const baseRouter = require('common/router/baseRouter');
const models = require('models');
const api = require('common/api/api');
const queryHelper = require('base/database/queryHelper');
const userHelper = require('../helpers/userHelper');

function controller(req) {
    // 准备检索条件
    let queryOpts = userHelper.preparePageQuery(req.body);

    // 执行检索
    return queryHelper.doPageQuery(
        models.user, queryOpts        
    ).then(function(result) {
        if (result.list) {
            return api.succeed(result);    
        } else {
            return api.succeed('error.query.nodata');
        }
    });
}

let router = baseRouter('/user/list', controller);

module.exports = router;
