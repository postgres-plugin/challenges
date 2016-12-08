'use strict';

var queries = require('./queries/index.js');
var formatters = require('./formatters/index.js');
var query = require('pg-helpers').query;
var initialiseQuery = require('./helpers/initialise-query.js');

function register (server, options, next) {
  var pool = options.pool;
  var initQuery = initialiseQuery(options);

  var add = function (chalObj, cb) {
    query(queries.add(chalObj), pool, function (queryErr, res) {
      if (queryErr) {
        return cb(queryErr);
      }

      return cb(null, res.rows);
    });
  };

  var getById = function (id, cb) {
    query(queries.getById(id), pool, function (queryErr, res) {
      if (queryErr) {
        return cb(queryErr);
      }

      return cb(queryErr, formatters.getById(res.rows));
    });
  };

  var getByTag = function (id, cb) {
    if (id === false) {
      return query(queries.getAllActive(), pool, function (queryErr, res) {
        if (queryErr) {
          return cb(queryErr, null);
        }

        return cb(queryErr, formatters.getByTag(res.rows));
      });
    }

    return query(queries.getByTag(id), pool, function (queryErr, res) {
      if (queryErr) {
        return cb(queryErr, null);
      }

      return cb(queryErr, formatters.getByTag(res.rows));
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
