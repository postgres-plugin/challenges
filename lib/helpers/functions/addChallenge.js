'use strict';

var fields = ['title', 'description', 'date', 'org_id', 'creator_id', 'active'];

module.exports = function (client, objectToAdd, cb) {
  var values = fields.map(function (field) {
    return '\'' + objectToAdd[field] + '\'';
  }).join(', ') + ');';
  var query = 'INSERT INTO challenges ('
               + fields.join(', ')
               + ') VALUES ('
               + values;

  client.query(query, function (err, res) {
    cb(err, res);
  });
};
