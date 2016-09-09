'use strict';

const modelHelper = require('base/database/modelHelper');
const sequelizeHelper = require('common/database/sequelize/sequelizeHelper')(modelHelper.sequelize);

sequelizeHelper.addHooks();

let db = modelHelper.loadModels(__dirname);

module.exports = db;
