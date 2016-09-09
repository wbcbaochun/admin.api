'use strict';

function OptimisticLockError() {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = 'optimistic lock error.';
}

module.exports = OptimisticLockError;