'use strict';

module.exports = function (tags_chals) {
  var result = '';
  var values = '';
  var fields = [
    'tags_id',
    'challenges_id'
  ];

  if (tags_chals.length > 0) {
    values = tags_chals.map(function (tc) {
      return '('
      + tc.tags_id + ', '
      + tc.challenges_id + ')';
    }).join(', ');

    result = 'INSERT INTO tags_challenges ('
    + fields.join(', ') + ') '
    + 'VALUES ' + values + ';';
  }

  return result;
};

