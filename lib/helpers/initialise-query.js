'use strict';

/**
* create an sql query which
* - create the tables people, organisations, tags_organisations if not defined
* - add some content to the table if options.reset is true
*/
var path = require('path');
var fs = require('fs');
var dropFile = path.resolve(__dirname, '../fixtures/drop-tables.sql');
var createTablesFile = path.resolve(__dirname, '../fixtures/create-tables.sql');
var dropTables = fs.readFileSync(dropFile, 'utf8').toString();
var createTables = fs.readFileSync(createTablesFile, 'utf8').toString();
var challengesData = require('../fixtures/challenges-data.js');
var tagsChalsData = require('../fixtures/tags-challenges-data.js');

module.exports = function (options) {
  var query = '';

  if (options.reset) {
    query += dropTables;
    query += createTables;
    query += challengesData(options.challenges);
    query += tagsChalsData(options.tags_challenges);

    return query;
  }

  return createTables;
};
