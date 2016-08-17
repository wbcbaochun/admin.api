'use strict';

var domain = require('domain');

function domainStorage(req, res, next) {
    // 登录用户保持
    var d = domain.create();
    d.req = req;
    d.run(next);
}

module.exports = domainStorage;
