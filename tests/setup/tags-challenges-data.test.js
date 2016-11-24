'use strict';

var test = require('tape');
var tagsChallenges = require('../../lib/fixtures/tags-challenges-data.js');

var tags_chals = [{
  tags_id: 1,
  challenges_id: 2
}];

var query = tagsChallenges(tags_chals);

var expected = 'INSERT INTO tags_challenges '
+ '(tags_id, challenges_id) VALUES '
+ '(1, 2);';

test('Converts array of tags_challenges to .sql query', function (t) {
  t.equal(query, expected, 'Query to add tags_challenges');
  t.end();
});
