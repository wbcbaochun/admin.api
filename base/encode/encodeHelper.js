'use strict';

var crypto = require('crypto');

// md5加密
var md5 = function(text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

var encodeHelper = {
    md5
};

module.exports = encodeHelper;
