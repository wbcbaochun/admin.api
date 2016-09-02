'use strict';
const log4js = require('log4js');
 	
let getLogger = function(filePath) {
    let filePathForLog = filePath.substring(global.__basedir.length + 1);
    return log4js.getLogger(filePathForLog);
};

let loggerHelper = {
    getLogger
};

module.exports = loggerHelper;
