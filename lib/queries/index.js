'use strict';

var add = require('./add.js');
var getById = require('./getById.js');
var getByTag = require('./getByTag.js');
var getAllActive = require('./getAllActive.js');

module.exports = {
  add: add,
  getById: getById,
  getByTag: getByTag,
  getAllActive: getAllActive
};
