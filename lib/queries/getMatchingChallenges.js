'use strict';

function convert(ids) {
  var res = '(';
  ids.forEach(function(id, i) {
    if (i < ids.length - 1) {
      res += id + ', ';
    } else {
      res += id;
    }
  });
  res += ')';
  return res;
}

module.exports = function (org_id, challenge_id, listOfTags) {
  return [
    'SELECT',
    'tags_id AS tag_id,',
    'challenges.id,',
    'challenges.title',
    'FROM',
    'tags_challenges',
    'JOIN challenges',
    'ON challenges.id = tags_challenges.challenges_id',
    'WHERE tags_id IN ' + convert(listOfTags),
    'AND challenges.active = true',
    'AND challenges.id <> ' + challenge_id,
    'AND challenges.org_id <> ' + org_id
  ].join(' ');
};
