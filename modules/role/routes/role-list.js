'use strict';

/**
 * API：角色列表
 */
const baseRouter = require('common/router/baseRouter');
const models = require('models');
const api = require('common/api/api');
const queryHelper = require('base/database/queryHelper');

function controller(req) {
    // 准备检索条件
    let queryOpts = queryHelper.buildPageQuery(req.body);

    // 执行检索
    return queryHelper.doPageQuery(
        models.role, queryOpts        
    ).then(function(result) {
        if (result.list) {
            return api.succeed(result);    
        } else {
            return api.succeed('error.query.nodata');
        }
    });
}

let router = baseRouter('/role/list', controller);

module.exports = router;
