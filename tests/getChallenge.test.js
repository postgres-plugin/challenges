'use strict';

var test = require('tape');
var getChallenge = require('../lib/queries/getChallenge.js');

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

test('getChallenge query string', function (t) {
  t.equal(getChallenge(10), query,
    'getChallenge fn takes a challengeId and outputs a valid query string');
  t.end();
});
