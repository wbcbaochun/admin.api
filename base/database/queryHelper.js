'use strict';

function buildWhere(searchCondition, itemKeys = []) {
	let where = {};
	for (let key of itemKeys) {
		if (searchCondition[key]) {
			where[key] = searchCondition[key];
		}
	}
	return where;
}
function buildPageQuery(searchCondition, itemKeys = [], queryOpts = {}) {
	let where = buildWhere(searchCondition, itemKeys);
	let offset = (searchCondition.page - 1) * searchCondition.count;
	let limit = parseInt(searchCondition.count);
	queryOpts.where = where;
	queryOpts.offset = offset;
	queryOpts.limit = limit;
	return queryOpts;
}

function convertDeleteFlag(deleteFlag, queryOpts = {}) {
    if (deleteFlag === '0') {
    	queryOpts.paranoid = true;
    } else if (deleteFlag === '1') {
    	queryOpts.where.deletedAt = {
    		$not: null
    	};
    	queryOpts.paranoid = false;
  	} else {
  		queryOpts.paranoid = false;
  	}
    
    return queryOpts;	
}

function doPageQuery(model, queryOpts = {}) {
	let result = {};
	let promise = model.count(queryOpts);
	return promise.then(function(count) {
		result.count = count;
		if (count > 0) {
			return model.findAll(queryOpts);
		} else {
			return null;
		}
	}).then(function(list) {
		if (list) {
			result.list = list;
		}
		return result;
	});
}

let queryHelper = {
	buildWhere,
	buildPageQuery,
	convertDeleteFlag,
	doPageQuery
};

module.exports = queryHelper;