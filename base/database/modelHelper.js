'use strict';

const fs        = require('fs');
const path      = require('path');
const cls       = require('continuation-local-storage');
const namespace = cls.createNamespace('db-default-ns');
let Sequelize   = require('sequelize');
const configHelper    = require('../config/configHelper');

/**
 * 加载指定目录下的所有模型
 * @param  {string} modelsDir [模型所在的目录]
 * @return {Object}           [所有模型的集合对象]
 */
function loadModels(modelsDir) {
	Sequelize.cls = namespace;

	let configs = configHelper.getConfigs();

	let sequelize = new Sequelize(configs.database, 
								  configs.username, 
								  configs.password, 
								  configs);
	let db        = {};

	fs
	  .readdirSync(modelsDir)
	  .filter(function(file) {
	    return (file.indexOf('.') !== 0) && (file !== 'index.js');
	  })
	  .forEach(function(file) {
	    let model = sequelize.import(path.join(modelsDir, file));
	    db[model.name] = model;
	  });

	Object.keys(db).forEach(function(modelName) {
	  if ('associate' in db[modelName]) {
	    db[modelName].associate(db);
	  }
	});

	db.sequelize = sequelize;
	db.Sequelize = Sequelize;
	return db;
}

let modelHelper = {
	loadModels
};

module.exports = modelHelper;

