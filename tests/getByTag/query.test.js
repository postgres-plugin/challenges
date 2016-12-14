'use strict';

var test = require('tape');
var getByTag = require('../../lib/queries/getByTag.js');

var query = 'SELECT '
+ 'tags_challenges.tags_id as tid, '
+ 'tags.name AS tags_name, '
+ 'challenges.id AS chal_id, '
+ 'challenges.date AS chal_date, '
+ 'challenges.title AS chal_title, '
+ 'challenges.description AS chal_description, '
+ 'organisations.name AS org_name, '
+ 'organisations.id AS org_id, '
+ '68 AS filter_id, '
+ '(SELECT tags.name WHERE tags.id = 68) AS filter_name '
+ 'FROM tags_challenges '
+ 'JOIN '
+ 'challenges '
+ 'ON '
+ 'tags_challenges.challenges_id = challenges.id '
+ 'JOIN '
+ 'tags '
+ 'ON '
+ 'tags_challenges.tags_id = tags.id '
+ 'JOIN '
+ 'organisations '
+ 'ON '
+ 'challenges.org_id = organisations.id '
+ 'WHERE tags_challenges.challenges_id '
+ 'IN ( '
+ '  SELECT '
+ '  challenges_id as chal_id '
+ '  FROM '
+ '  tags_challenges '
+ '  WHERE '
+ '  tags_challenges.tags_id = 68 '
+ ') '
+ 'AND tags.active = TRUE '
+ 'AND challenges.active = TRUE '
+ 'AND organisations.active = TRUE '
+ 'ORDER BY challenges.date DESC, '
+ 'challenges.title ASC;';


test('getByTag query string', function (t) {
  t.equal(getByTag(68), query,
    'getByTag function takes an object and give a valid querystring');
  t.end();
});
