'use strict';

var fields = ['title', 'description', 'date', 'org_id', 'creator_id', 'active'];

// validation will
module.exports = function (objectToAdd) {
  var values = fields.map(function (field) {
    return '\'' + objectToAdd[field] + '\'';
  }).join(', ');

  return 'INSERT INTO challenges (' + fields.join(', ') + ')'
    + ' VALUES (' + values + ')';
};
