'use strict';

var test = require('tape');
var getByTag = require('../../lib/queries/getByTag.js');

var query = [
  'SELECT',
  'filter_id, filter_name, chal_id, chal_date, chal_title, chal_description, org_id, org_name',
  'FROM (',
    'SELECT',
    '68 AS filter_id,',
    'tags.name AS filter_name',
    'FROM',
    'tags WHERE tags.id = 68',
  ') AS filter_details',
  'LEFT OUTER JOIN (',
    'SELECT',
      'tid, chal_id, chal_date, chal_title, chal_description, org_id, org_name',
      'FROM (',
      'SELECT',
      'tags_id AS tid,',
      'challenges_id AS chal_id',
      'FROM tags_challenges',
    ') AS challenge_ids',
    'INNER JOIN (',
      'SELECT',
      'id, org_id,',
      'date AS chal_date,',
      'title AS chal_title,',
      'description AS chal_description',
      'FROM challenges',
      'WHERE challenges.active is not false',
    ') AS challenge_details',
    'on challenge_details.id = chal_id',
    'INNER JOIN (',
      'SELECT',
      'id, name AS org_name',
      'FROM organisations',
      'WHERE organisations.active is not false',
    ') AS org_details',
    'on org_details.id = org_id',
  ') AS challenges_all',
  'on challenges_all.tid = filter_details.filter_id',
  'ORDER BY chal_date DESC,',
  'chal_title ASC;'
].join(' ');

test('getByTag query string', function (t) {
  t.equal(getByTag(68), query,
    'getByTag function takes an object and give a valid querystring');
  t.end();
});
