'use strict';

var test = require('tape');
var getChallenge = require('../../lib/queries/getChallenge.js');

var challengeId = 10;
var query = 'SELECT '
  + 'challenges.id AS chal_id, '
  + 'challenges.title AS chal_title, '
  + 'challenges.description AS chal_desc, '
  + 'tags.name AS tags_name, '
  + 'org_id, tags_id '
  + 'FROM '
  + 'challenges '
  + 'JOIN tags_challenges ON tags_challenges.challenges_id = challenges.id '
  + 'JOIN tags ON tags_challenges.tags_id = tags.id '
  + 'WHERE '
  + 'tags.active = true AND challenges.active = true '
  + 'AND challenges.id = ' + challengeId + ';';

test('getChallenge query string', function (t) {
  t.equal(getChallenge(10), query,
    'getChallenge fn takes a challengeId and outputs a valid query string');
  t.end();
});
