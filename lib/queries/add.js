'use strict';

var escape = require('pg-escape');

var escapeFields = ['title', 'description'];
var unescapeFields = ['org_id', 'creator_id', 'active'];

module.exports = function (objectToAdd) {
  var escapedValues = escapeFields.map(function (field) {
    return escape.literal(objectToAdd[field]);
  });
  var unescapedValues = unescapeFields.map(function (field) {
    return objectToAdd[field];
  });

  return 'INSERT INTO challenges ('
    + escapeFields.concat(unescapeFields).join(', ') + ')'
    + ' VALUES (' + escapedValues.concat(unescapedValues).join(', ') + ');';
};
