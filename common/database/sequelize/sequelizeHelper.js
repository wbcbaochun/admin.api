'use strict';

const constants = require('common/constant/constants');
const Sequelize   = require('sequelize');

const DEFAULT_PARANOID = true;  // 默认为逻辑删除

let createOrUpdateUserId = {
    type: Sequelize.BIGINT(11),
    allowNull: false,
    defaultValue: '0'
};

let defaultUser = {
    id: constants.SYS_DEFAULT_USER_ID
};

/**
 * ORM框架-sequelize的帮助类
 * @param  {[sequelize]} sequelize [sequelize的实例]
 */
let sequelizeHelper = function(sequelize) {
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
        sequelize.addHook('beforeDefine', function(attributes, options) {
            // 所有模型追加登录用户ID和更新用户ID
            attributes.createUserId = Object.assign({}, createOrUpdateUserId);
            attributes.updateUserId = Object.assign({}, createOrUpdateUserId);
            
            // 所有模型默认使用逻辑删除
            if (typeof options.paranoid === 'undefined') {
                options.paranoid = DEFAULT_PARANOID;
            }

        });
    }

    return {
        addHooks
    };
};

module.exports = sequelizeHelper;
