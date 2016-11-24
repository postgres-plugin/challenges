'use strict';

var addChallenge = require('./addChallenge.js');
var getChallenge = require('./getChallenge.js');
var getChallengesByTag = require('./getChallengesByTag.js');
var getAllActive = require('./getAllActive.js');

module.exports = {
  addChallenge: addChallenge,
  getChallenge: getChallenge,
  getChallengesByTag: getChallengesByTag,
  getAllActive: getAllActive
};
