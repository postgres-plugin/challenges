'use strict';

var Hoek = require('hoek');
var initialiseTable = require('./helpers/initialise-table.js');
var addChallenge = require('./api/addChallenge.js');

function register (server, options, next) {
  options.pool.connect(function (connErr, client, done) {
    Hoek.assert(!connErr, 'db connection error: ', connErr);
    initialiseTable(client, function (error) {
      Hoek.assert(!error, error);
      done();

      return next();
    });
  });
}

register.attributes = { name: 'challenges' };

module.exports = register;
