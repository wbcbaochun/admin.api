'use strict';

const express = require('express');
const logger = require('base/logger/loggerHelper').getLogger(__filename);
const models = require('models');

function _getTrans(url, optTrans) {
	let trans = false;

	if (typeof optTrans !== 'undefined') {
		trans = optTrans;
	} else {
		if (url.match(/edit|update|create|delete/)) {
			trans = true;
		}		
	}

	return trans;
}

/**
 * 路由基类
 * @param {String} url  路由URL
 * @param {Function} ctrl 路由的Function
 * @param {Object} [opts] {
 *                      	boolean [trans] : 是否打开事务 default false,
 *                        }
 */
function BaseRouter(url, ctrl, opts = {}) {
	function _baseCtrl(req, res, next) {
		logger.debug(`ctrl start : ${url}`);

		let trans = _getTrans(url, opts.trans);

		let pCtrl;
		// 是否打开事务
		if (trans) {
			// 打开事务
			pCtrl = models.sequelize.transaction(function() {
				return ctrl(req, res, next);
			});
		} else {
			// 不打开事务
			pCtrl = ctrl(req, res, next);
		}
		pCtrl.then(result => res.json(result))				
			 .catch(next)
			 .finally(() => logger.debug(`ctrl end : ${url}`))
			 .done();	
	}
	
	let router = express.Router();
	router.post(url, _baseCtrl);

	return router;
}

module.exports = BaseRouter;
