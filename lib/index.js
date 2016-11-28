'use strict';

var queries = require('./queries/index.js');
var formatters = require('./formatters/index.js');
var query = require('pg-helpers').query;
var initialiseQuery = require('./helpers/initialise-query.js');

function register (server, options, next) {
  var pool = options.pool;
  var initQuery = initialiseQuery(options);

  var add = function (chalObj, cb) {
    query(queries.add(chalObj), pool, cb);
  };

  var getById = function (id, cb) {
    query(queries.getById(id), pool, function (err, res) {
      cb(err, formatters.getById(res));
    });
  };

  var getByTag = function (id, cb) {
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

  query(initQuery, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.method('pg.challenges.add', add);
    server.method('pg.challenges.getById', getById);
    server.method('pg.challenges.getByTag', getByTag);

    return next();
  });
}

register.attributes = { name: 'challenges' };

module.exports = register;
