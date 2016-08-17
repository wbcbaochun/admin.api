'use strict';
const log4js = require('log4js');
 	
var getLogger = function(filePath) {
    var filePathForLog = filePath.substring(global.__basedir.length + 1);
    return log4js.getLogger(filePathForLog);
};

var loggerHelper = {
    getLogger
};

module.exports = loggerHelper;
