'use strict';

/**
* create an sql query which
* - create the tables people, organisations, tags_organisations if not defined
* - add some content to the table if options.reset is true
*/
var query = require('pg-helpers').query;
var challengesData = require('../fixtures/challenges-data.js');
var tagsChalsData = require('../fixtures/tags-challenges-data.js');

module.exports = function (options, pool, cb) {
  var queryString = challengesData(options.challenges)
  + tagsChalsData(options.tags_challenges);

  return query(queryString, pool, cb);
};
