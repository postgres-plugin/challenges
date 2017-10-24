'use strict';

var escape = require('pg-escape');

var fields = ['comment'];

module.exports = function (comment) {
  var newValues = fields.reduce(function (arr, key) {
    if (comment[key]) {
      return arr.concat(key + ' = ' + escape.literal(comment[key]));
    }

    return arr;
  }, []).join(', ');

  if (comment.hasOwnProperty('flagged')) {
    newValues += ', flagged = ' + comment.flagged
  }

  return [
    'UPDATE',
    'comments',
    'SET',
    newValues,
    ', updated_at = default',
    'WHERE',
    'id = ' + comment.id,
    ';'
  ].join(' ');
};
