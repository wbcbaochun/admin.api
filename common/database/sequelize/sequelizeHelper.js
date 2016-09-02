'use strict';

const constants = require('common/constant/constants');

/**
 * ORM框架-sequelize的帮助类
 * @param  {[sequelize]} sequelize [sequelize的实例]
 */
let sequelizeHelper = function(sequelize) {
	const defaultUser = {
		id : constants.SYS_DEFAULT_USER_ID
	};

    // add hook
    function addHooks() {
    	function _getCurrentUser() {
    	    let currentUser = defaultUser;
            // 登录用户取得
            if (process.domain && process.domain.req.currentUser) {
                currentUser = process.domain.req.currentUser;
            }
            return currentUser;
    	}

        sequelize.addHook('beforeBulkCreate', function(models, options, done) {
            // 登录用户取得
            let currentUser = _getCurrentUser();

            models.forEach(function(model) {
                // 登录用户id
                model.dataValues.createUserId = currentUser.id;
                // 更新用户id
                model.dataValues.updateUserId = currentUser.id;
            });

            return done();
        });
        sequelize.addHook('beforeBulkUpdate', function(model, done) {
            // 登录用户取得
            let currentUser = _getCurrentUser();

            // 更新用户id
            model.attributes.updateUserId = currentUser.id;
            model.fields.push('updateUserId');

            return done();
        });
        sequelize.addHook('beforeCreate', function(model, options, done) {
            // 登录用户取得
            let currentUser = _getCurrentUser();
            // 登录用户id
            model.dataValues.createUserId = currentUser.id;
            // 更新用户id
            model.dataValues.updateUserId = currentUser.id;
            return done();
        });
        sequelize.addHook('beforeUpdate', function(model, options, done) {
            // 登录用户取得
            let currentUser = _getCurrentUser();
            // 更新用户id
            model.dataValues.updateUserId = currentUser.id;
            model._changed.updateUserId = true;

            return done();
        });
    }

    return {
        addHooks
    };
};

module.exports = sequelizeHelper;
