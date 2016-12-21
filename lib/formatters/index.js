'use strict';

var getById = require('./getById.js');
var getByTag = require('./getByTag.js');
var getMatchingOrgs = require('./getMatchingOrgs.js');

module.exports = {
  getById: getById,
  getByTag: getByTag,
  getMatchingOrgs: getMatchingOrgs
};
