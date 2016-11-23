'use strict';

var path = require('path');
var fs = require('fs');
var queries = require('./queries/index.js');
var format = require('./formatters/index.js');
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
        query(queries.getChallenge(id), pool, cb);
      };


      request.getChallengesByTag = function (id, cb) {
        console.log(id);
        query(queries.getChallengesByTag(id), pool, function (queryErr, rows) {
          var result = {};

          console.log(queryErr, rows);
          result.challenges = format.getChallengesByTag(rows);

          return cb(queryErr, result);
        });
      };


      reply.continue();
    });

    return next();
  });
}

register.attributes = { name: 'challenges' };

module.exports = register;
