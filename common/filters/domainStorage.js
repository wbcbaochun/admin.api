'use strict';

const domain = require('domain');

function domainStorage(req, res, next) {
    // 登录用户保持
    let d = domain.create();
    d.req = req;
    d.run(next);
}

module.exports = domainStorage;
