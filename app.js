'use strict';

require('app-module-path').addPath(__dirname);
var express = require('express');
var app = express();

// express middleware
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');

// orther
var log4js = require('log4js');
var path = require('path');

// set base dir
global.__basedir = path.resolve(__dirname);

// helper
var routeHelper = require('base/route/routeHelper');
var logHelper = require('base/logger/loggerHelper');
var tokenHelper = require('base/security/jwt/tokenHelper');
var messageHelper = require('base/message/messageHelper');

// config and constants
var constants = require('common/constant/constants');
var configHelper = require('base/config/configHelper');

// model and seeds
var models = require('models');
var seeds = require('seeds/seeds')(models);

var logger = logHelper.getLogger(__filename);

var appModules = require('modules');
// setup helper
tokenHelper.setup(constants.JWS_TOKEN_KEY, {
	expiresIn: configHelper.getConfig('tokenExpiresIn')
});
messageHelper.setup(require('common/constant/messages'), appModules);

// use static files
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(cookieParser());

// use validator
app.use(expressValidator());

// set cors
app.use(cors({
	exposedHeaders: [constants.USER_TOKEN_KEY]
}));

// use access log
log4js.configure('config/log4js.json');
app.use(log4js.connectLogger(log4js.getLogger('http'), {
	level: 'auto'
}));

// customize filter
var authVerify = require('common/filters/authVerify');
var domainStorage = require('common/filters/domainStorage');
var errorHandle = require('common/filters/errorHandle');

// use domain stroage
app.use(domainStorage);

// use auth filter
app.use(authVerify);

// set routers
routeHelper.loadRoutes(app, appModules);

// use error log
app.use(errorHandle);

// init db
var sequelizeHelper = require('common/database/sequelize/sequelizeHelper')(models.sequelize);
// add hook
sequelizeHelper.addHooks();

// sync db
models.sequelize.sync({
	force: configHelper.getConfig('syncForce')
}).then(function() {
	logger.info('Database sync successed.');
	seeds.seedAll();
});

// open listen
var serverPort = configHelper.getConfig('serverPort');
app.listen(serverPort, function() {
	logger.info(`app listening on port ${serverPort}, env = %s`, process.env.NODE_ENV || 'development');
});

module.exports = app;