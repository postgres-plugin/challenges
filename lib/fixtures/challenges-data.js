'use strict';

var escape = require('pg-escape');

module.exports = function (challenges) {
  var result = '';
  var values = '';
  var fields = [
    'title',
    'description',
    'org_id',
    'creator_id',
    'active'
  ];

  if (challenges.length > 0) {
    values = challenges.map(function (chal) {
      return '('
      + escape.literal(chal.title) + ', '
      + escape.literal(chal.description) + ', '
      + chal.org_id + ', '
      + chal.creator_id + ', '
      + chal.active + ')';
    }).join(', ');

    result = 'INSERT INTO challenges ('
    + fields.join(', ') + ') '
    + 'VALUES ' + values + ';';
  }

  return result;
};
