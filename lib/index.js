'use strict';

var queries = require('./queries/index.js');
var formatters = require('./formatters/index.js');
var query = require('pg-helpers').query;
var initialiseQuery = require('./helpers/initialise-query.js');
var initialisePgChallenges = require('./helpers/init-pg-challenges');

function register (server, options, next) {
  var pool = options.pool;
  var initQuery = initialiseQuery(options);

  query(initQuery, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.ext('onPreHandler', function (request, reply) {
      // initialise request.pg.challenges
      initialisePgChallenges(request);

      request.pg.challenges.add = function (chalObj, cb) {
        query(queries.add(chalObj), pool, cb);
      };


      request.pg.challenges.getById = function (id, cb) {
        query(queries.getById(id), pool, function (err, res) {
          cb(err, formatters.getById(res));
        });
      };


      request.pg.challenges.getByTag = function (id, cb) {
        if (id === false) {
          return query(queries.getAllActive, pool, function (queryErr, rows) {
            var results = formatters.getByTag(rows);

            return cb(queryErr, results);
          });
        }

        return query(queries.getByTag(id), pool, function (queryErr, rows) {
          var results = formatters.getByTag(rows);

          return cb(queryErr, results);
        });
      };


      reply.continue();
    });

    return next();
  });
}

register.attributes = { name: 'challenges' };

module.exports = register;
