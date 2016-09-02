'use strict';

const queryHelper = require('base/database/queryHelper');

const whereKeys = ['name', 'mail'];
const order = [['updatedAt', 'DESC']];

function _editQueryOpts(queryOpts, searchCondition) {
    // 设置 name 的模糊检索
    if (queryOpts.where.name) {
        queryOpts.where.name = { like: queryOpts.where.name + '%' };
    }
    // 设置 有效区分的检索条件
    queryOpts = queryHelper.convertDeleteFlag(searchCondition.deleteFlag, queryOpts);
    return queryOpts;
}

function prepareQuery(searchCondition) {
    let queryOpts = {
    	where: queryHelper.buildWhere(searchCondition, whereKeys),
        order: order,
        attributes:  ['id', 'name', 'mail', 'deletedAt']
    };
    return _editQueryOpts(queryOpts, searchCondition);
}

function preparePageQuery(searchCondition) {
	let queryOpts = queryHelper.buildPageQuery(
		searchCondition, 
		whereKeys, 
		{ order: order }
    );
    return _editQueryOpts(queryOpts, searchCondition);
}

let userHelper = {
	prepareQuery,
	preparePageQuery
};

module.exports = userHelper;
