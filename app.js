'use strict';

require('app-module-path').addPath(__dirname);
const express = require('express');
const app = express();

// express middleware
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

// orther
const log4js = require('log4js');
const path = require('path');

// set base dir
global.__basedir = path.resolve(__dirname);

// helper
const routeHelper = require('base/route/routeHelper');
const logHelper = require('base/logger/loggerHelper');
const tokenHelper = require('base/security/jwt/tokenHelper');
const messageHelper = require('base/message/messageHelper');

// config and constants
const constants = require('common/constant/constants');
const configHelper = require('base/config/configHelper');

// model and seeds
const models = require('models');
const seeds = require('seeds/seeds')(models);
const logger = logHelper.getLogger(__filename);
const appModules = require('modules');

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
const authVerify = require('common/filters/authVerify');
const domainStorage = require('common/filters/domainStorage');
const errorHandle = require('common/filters/errorHandle');

// use domain stroage
app.use(domainStorage);

// use auth filter
app.use(authVerify);

// set routers
routeHelper.loadRoutes(app, appModules);

// use error log
app.use(errorHandle);

// sync db
const isSyncForce = configHelper.getConfig('syncForce');
models.sequelize.sync({
	force: isSyncForce
}).then(function() {
	logger.info('Database sync successed.');
	if (isSyncForce) {
		logger.info('Database seed.');
		seeds.seedAll();
	}
});

// open listen
const serverPort = configHelper.getConfig('serverPort');
let server = app.listen(serverPort, function() {
	logger.info(`app listening on port ${serverPort}, env = %s`, process.env.NODE_ENV || 'development');
});

// socket
let socketHelper = require('base/socket/socketHelper');
socketHelper.listen(server);

module.exports = app;