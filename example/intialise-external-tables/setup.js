'use strict';

var path = require('path');
var fs = require('fs');

var file = path.resolve(__dirname, './setup.sql');
var setupTables = fs.readFileSync(file, 'utf8').toString();

function setup (pool, cb) {
  // connect to our database
  pool.connect(function (err, client, done) {
    if (err) {
      done();

      return cb(err);
    }

    // execute a query on our database
    return client.query(setupTables, function (queryErr) {
      if (queryErr) {
        done();

        return cb(queryErr);
      }

      console.log('tables are initialised');
      // disconnect the client
      done();

      return cb();
    });
  });
}

module.exports = setup;
