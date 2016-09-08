'use strict';

/**
 * Socket通信帮助类
 */
const logger = require('base/logger/loggerHelper').getLogger(__filename);

let io,
	handles = [];

/**
 * 打开监听，当有client连接时将socket委托给注册的handle进行处理
 * @param  {socket.io server} server [参考socket.io库]
 * @return 无
 */
function listen(server) {
	io = require('socket.io').listen(server);
	io.on('connection', socket => {
		logger.debug(`【socket】client connected. socket id = ${socket.id}`);
		handles.forEach(handle => handle(socket));
	});
}

/**
 * 添加处理Handle
 * @param {[type]} handle [description]
 */
function addHandle(handle) {
	handles.push(handle);
}

let socketHelper = {
	listen,
	addHandle
}

module.exports = socketHelper;
