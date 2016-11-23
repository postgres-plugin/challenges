'use strict';

var path = require('path');
var fs = require('fs');
var queries = require('./queries/index.js');
var formatters = require('./formatters/index.js');
var query = require('pg-helpers').query;

var file = path.resolve(__dirname, './fixtures/challenges-table.sql');
var fixtures = fs.readFileSync(file, 'utf8').toString();

function register (server, options, next) {
  var pool = options.pool;

  query(fixtures, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.ext('onPreHandler', function (request, reply) {
      request.addChallenge = function (chalObj, cb) {
        query(queries.addChallenge(chalObj), pool, cb);
      };

      request.getChallenge = function (id, cb) {
        query(queries.getChallenge(id), pool, function (err, res) {
          cb(err, formatters.getChallengeById(res));
        });
      };
      reply.continue();
    });

    return next();
  });
}

register.attributes = { name: 'challenges' };

module.exports = register;
