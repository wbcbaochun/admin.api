'use strict';
var logger = require('base/logger/loggerHelper').getLogger(__filename);
var encodeHeper = require('base/encode/encodeHelper');

var seeds = function(db) {
    var seedAll = function() {
        _seedUser();

        logger.info('Database seed data insert successed.');
    };

    var _seedUser = function() {
        let users = [];
        for (let i = 0; i < 20; i++) {
            users.push({
                name: `test${i}`,
                password: encodeHeper.md5('123456'),
                mail: `test${i}@test.com`
            });
        }
        db.user.bulkCreate(users);
    };

    return {
        seedAll
    };
};

module.exports = seeds;
