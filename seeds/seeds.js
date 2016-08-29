'use strict';
var logger = require('base/logger/loggerHelper').getLogger(__filename);
var encodeHeper = require('base/encode/encodeHelper');

var seeds = function(db) {
    var seedAll = function() {
        _seedRole();
        _seedPermission();
        _seedUser();

        logger.info('Database seed data insert successed.');
    };

    var _seedRole = function() {
        let roles = [{
            id: 1,
            name: 'admin'
        }, {
            id: 2,
            name: 'test'
        }];
        db.role.bulkCreate(roles);
    };

    var _seedPermission = function() {
        let permissions = [{
            name: 'user.view',
            roleId: 1
        }, {
            name: 'user.edit',
            roleId: 1
        },
        {
            name: 'user.view',
            roleId: 2
        }];
        return db.permission.bulkCreate(permissions);       
    };

    var _seedUser = function() {
        let users = [];
        for (let i = 0; i < 20; i++) {
            users.push({
                name: `test${i}`,
                password: encodeHeper.md5('123456'),
                mail: `test${i}@test.com`,
                roleId: i % 2 === 0 ? '1' : '2'
            });
        }
        return db.user.bulkCreate(users);
    };

    return {
        seedAll
    };
};

module.exports = seeds;
