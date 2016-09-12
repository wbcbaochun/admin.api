'use strict';

/**
 * 排他错误
 * 基于乐观锁的排他错误
 */
function OptimisticLockError() {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = 'optimistic lock error.';
}

module.exports = OptimisticLockError;