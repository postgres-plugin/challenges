'use strict';

var escape = require('pg-escape');

var fields = ['title', 'description'];

module.exports = function (id, obj) {
  var newValues = fields.reduce(function (arr, key) {
    if (obj[key]) {
      return arr.concat(key + ' = ' + escape.literal(obj[key]));
    }

    return arr;
  }, []).join(', ');

  return [
    'UPDATE',
    'challenges',
    'SET',
    newValues,
    'WHERE',
    'id = ' + id,
    ';'
  ].join(' ');
};
