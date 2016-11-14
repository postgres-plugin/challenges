'use strict';

var Hoek = require('hoek');
var initialiseTable = require('./helpers/initialise-table.js');

function register (server, options, next) {
  options.pgPool.connect(function (connErr, client, done) {
    Hoek.assert(!connErr, connErr);
    initialiseTable(client, function (error) {
      Hoek.assert(!error, error);
      done();

      return next();
    });
  });
}

register.attributes = {
  name: 'challenges',
  version: '1.0.0'
};


module.exports = register;
