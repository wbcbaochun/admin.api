'use strict';

const _ = require('lodash');
const DEFAULT_BASE_URL = '/api';

/**
 * 加载路由
 * 从模块定义中加载路由
 * @param  {Application} app    - express application
 * @param  {Object} appModules  - app的modules
 * @param  {Object} opts        - {
 *                                  baseUrl (string 非必须) - route的基础url
 *                                }
 * @return none
 */
function loadRoutes(app, appModules, opts = {}) {
	let baseUrl = opts.baseUrl || DEFAULT_BASE_URL;

    function _loadModuleRoutes(routes) {
        _.map(routes, function(route) {
            app.use(baseUrl, route);
        });
    }

    let modulesWithRoute = _.values(appModules).map(item => item.routes);
    modulesWithRoute.forEach(function(routes) {
        _loadModuleRoutes(routes);
    });
}



let routeHelpers = {
    loadRoutes
};

module.exports = routeHelpers;
