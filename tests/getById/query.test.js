'use strict';

var test = require('tape');
var getById = require('../../lib/queries/getById.js');

var challengeId = 10;
var query = 'SELECT '
  + 'challenges.id AS id, challenges.title AS title, '
  + 'challenges.description AS description, challenges.org_id AS org_id, '
  + 'challenges.creator_id AS creator_id, tags.name AS tags_name, '
  + 'org_id, tags_id '
  + 'FROM challenges '
  + 'JOIN tags_challenges ON tags_challenges.challenges_id = challenges.id '
  + 'JOIN tags ON tags_challenges.tags_id = tags.id '
  + 'WHERE tags.active = true '
  + 'AND challenges.active = true '
  + 'AND challenges.id = ' + challengeId + ' '
  + 'ORDER BY tags.name ASC;';

test('getById query string', function (t) {
  t.equal(getById(10), query,
    'getById fn takes a challengeId and outputs a valid query string');
  t.end();
});
