'use strict';

const bulk = require('bulk-require');
const moduleItems = bulk(__dirname, ['./**/!(*index|*.spec).js']);

module.exports = moduleItems;