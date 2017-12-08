'use strict';

var getById = require('./getById.js');
var getByTag = require('./getByTag.js');
var getMatchingChallenges = require('./getMatchingChallenges.js');
var getMatchingOrgs = require('./getMatchingOrgs');

module.exports = {
  getById: getById,
  getByTag: getByTag,
  getMatchingChallenges: getMatchingChallenges,
  getMatchingOrgs: getMatchingOrgs
};
