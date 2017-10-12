'use strict';

var getById = require('./getById.js');
var getByTag = require('./getByTag.js');
var getMatchingOrgs = require('./getMatchingOrgs.js');
var getMatchingChallenges = require('./getMatchingChallenges.js');

module.exports = {
  getById: getById,
  getByTag: getByTag,
  getMatchingOrgs: getMatchingOrgs,
  getMatchingChallenges: getMatchingChallenges
};
