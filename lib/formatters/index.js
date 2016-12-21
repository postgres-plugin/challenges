'use strict';

var getById = require('./getById.js');
var getByTag = require('./getByTag.js');
var getChalAndMatchingOrgs = require('./getChalAndMatchingOrgs.js');

module.exports = {
  getById: getById,
  getByTag: getByTag,
  getChalAndMatchingOrgs: getChalAndMatchingOrgs
};
