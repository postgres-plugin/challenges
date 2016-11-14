'use strict';

/**
* Create the challenges table
**/
var path = require('path');
var fs = require('fs');
var file = path.resolve(__dirname, '../fixtures/challenges-table.sql');
var fixtures = fs.readFileSync(file, 'utf8').toString();

module.exports = function (client, cb) {
  client.query(fixtures, function (errorTable) {
    return cb(errorTable);
  });
};
