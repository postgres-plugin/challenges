'use strict';

var escape = require('pg-escape');

var escapeFields = ['comment'];
var unescapeFields = [
  'author_id',
  'flagged',
  'author_flag',
  'challenge_id',
  'active'
];

module.exports = function (comment) {
  var escapedValues = escapeFields.map(function (field) {
    return escape.literal(comment[field]);
  });
  var unescapedValues = unescapeFields.map(function (field) {
    return comment[field];
  });

  return [
    'INSERT INTO comments (',
    escapeFields.concat(unescapeFields).join(', '),
    ') VALUES (',
    escapedValues.concat(unescapedValues).join(', '),
    ') RETURNING id;'
  ].join(' ');
};
