'use strict';

var escape = require('pg-escape');

var escapeFields = ['title', 'description'];
var unescapeFields = ['date', 'org_id', 'creator_id', 'active']

module.exports = function (objectToAdd) {
  var values = fields.map(function (field) {
    return '\'' + objectToAdd[field] + '\'';
  }).join(', ');

  return 'INSERT INTO challenges (' + fields.join(', ') + ')'
    + ' VALUES (' + values + ')';
};
