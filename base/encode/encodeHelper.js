'use strict';

let crypto = require('crypto');

// md5加密
let md5 = function(text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

let encodeHelper = {
    md5
};

module.exports = encodeHelper;
