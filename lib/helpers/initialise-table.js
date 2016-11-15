'use strict';

/**
* Create the challenges table
**/
var path = require('path');
var fs = require('fs');
var file = path.resolve(__dirname, '../fixtures/challenges-table.sql');
var fixtures = fs.readFileSync(file, 'utf8').toString();

module.exports = function (pool, cb) {
  pool.connect(function (poolErr, client, done) {
    if (poolError) {
      return cb(poolError);
    }

    return client.query(fixtures, function (errorTable) {
      if (errorTable) {
        return cb(errorTable);
      }
      done();

      return cb();
    });
  });
};
