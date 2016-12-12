'use strict';

var test = require('tape');
var getById = require('../../lib/queries/getById.js');

var challengeId = 10;
var query = [
  'SELECT',
  'challenges.id AS id,',
  'challenges.title AS title,',
  'challenges.description AS description,',
  'challenges.creator_id AS creator_id,',
  'challenges.org_id AS org_id,',
  'organisations.name AS org_name, ',
  'tags.id AS tags_id,',
  'tags.name AS tags_name',
  'FROM organisations',
  'RIGHT OUTER JOIN challenges',
  'ON (challenges.org_id = organisations.id)',
  'LEFT OUTER JOIN tags_challenges',
  'ON (tags_challenges.challenges_id = challenges.id)',
  'LEFT OUTER JOIN tags',
  'ON (tags.id = tags_challenges.tags_id)',
  'WHERE organisations.active = true',
  'AND challenges.active = true',
  'AND challenges.id = ' + challengeId,
  'ORDER BY tags_name ASC;'
].join(' ');


test('getById query string', function (t) {
  t.equal(getById(10), query,
    'getById fn takes a challengeId and outputs a valid query string');
  t.end();
});
