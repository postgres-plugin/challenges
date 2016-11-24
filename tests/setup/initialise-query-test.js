'use strict';

var test = require('tape');
var path = require('path');
var fs = require('fs');

var initialiseQuery = require('./../../lib/helpers/initialise-query.js');
var dropFile = path.resolve(__dirname + './../../lib/fixtures/drop-tables.sql');
var dropTables = fs.readFileSync(dropFile, 'utf8');
var initFile = path.resolve(__dirname + './../../lib/fixtures/create-tables.sql');
var createTables = fs.readFileSync(initFile, 'utf8');

test('Create initialise query: reset = false', function (t) {
  var options = {
    reset: false,
    challenges: [],
    tags_challenges: []
  };

  var query = initialiseQuery(options);

  t.equal(query, createTables, 'reset:false returns createTables only');
  t.end();
});

test('Create initialise query: reset = false', function (t) {
  var testChal = [
    {
      title: 'A title',
      description: 'A desc',
      date: 1479491066104,
      org_id: 1,
      creator_id: 2,
      active: true
    }
  ];

  var testTC = [
    {
      tags_id: 1,
      challenges_id: 2
    }
  ]

  var options = {
    reset: true,
    challenges: testChal,
    tags_challenges: testTC
  };

  var query = initialiseQuery(options);

  var challengesExpected = 'INSERT INTO challenges '
  + '(title, description, date, org_id, creator_id, active) VALUES ('
  + "'A title', 'A desc', 1479491066104, 1, 2, true);";

  var tagsChalsExpected = 'INSERT INTO tags_challenges '
  + '(tags_id, challenges_id) VALUES '
  + '(1, 2);';

  var expected = dropTables + createTables + challengesExpected
    + tagsChalsExpected;

  t.equal(query, expected, 'reset:true returns input string');
  t.end();
});
