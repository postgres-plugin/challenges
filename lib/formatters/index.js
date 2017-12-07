'use strict';

var getById = require('./getById.js');
var getByTag = require('./getByTag.js');
var getMatchingChallenges = require('./getMatchingChallenges.js');

module.exports = {
  getById: getById,
  getByTag: getByTag,
  getMatchingChallenges: getMatchingChallenges
};
