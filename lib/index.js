'use strict';

var Boom = require('boom');
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

  var edit = function (id, obj, cb) {
    query(queries.edit(id, obj), pool, function (queryErr, res) {
      return cb(queryErr, res.rows);
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

  var checkEditable = function (userId, chalId, cb) {
    query(queries.checkEditable(userId, chalId), pool, function (err, res) {
      var result;

      if (!err) {
        // If there are no rows, the challenge is not editable
        result = res.rows.length > 0;
      }

      return cb(err, result);
    });
  };

  var toggleActive = function (id, cb) {
    return query(queries.toggleActive(id), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }
      if (res.rowCount === 0) {
        return cb(null, Boom.notFound('Challenge does not exist'));
      }

      return cb(null, res.rows);
    });
  };

  var getMatchingOrgs = function (chal_id, cb) {
    query(queries.getMatchingOrgs(chal_id), pool, function (queryErr, res) {
      if (queryErr) {
        return cb(queryErr);
      }

      return cb(null, formatters.getMatchingOrgs(res.rows));
    });
  };

  var getMatchingChallenges = function (chal_id, listOfTags, cb) {
    if (listOfTags.length === 0) {
      return cb(null, []);
    }

    query(queries.getMatchingChallenges(chal_id, listOfTags), pool, function (queryErr, res) {
      if (queryErr) {
        return cb(queryErr);
      }

      return cb(null, formatters.getMatchingChallenges(res.rows));
    });
  };

  var getArchived = function (orgId, cb) {
    query(queries.getArchived(orgId), pool, function (queryErr, res) {
      return cb(queryErr, res.rows);
    });
  };

  var challengesSearch = function (searchTerm, cb) {
    query(queries.challengesSearch(searchTerm), pool, function (queryErr, res) {
      return cb(queryErr, res.rows);
    });
  };

  var getByOrgId = function (orgId, cb) {
    query(queries.getByOrgId(orgId), pool, function (queryErr, res) {
      return cb(queryErr, res.rows);
    });
  };

  var addComment = function(comment, cb) {
    query(queries.addComment(comment), pool, function(queryErr, res) {
      return cb(queryErr, res.rows);
    });
  }

  var getComments = function(challengeId, cb) {
    query(queries.getComments(challengeId), pool, function(queryErr, res) {
      return cb(queryErr, res.rows)
    });
  }


  query(initQuery, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.method('pg.challenges.add', add);
    server.method('pg.challenges.edit', edit);
    server.method('pg.challenges.getById', getById);
    server.method('pg.challenges.getByTag', getByTag);
    server.method('pg.challenges.checkEditable', checkEditable);
    server.method('pg.challenges.toggleActive', toggleActive);
    server.method('pg.challenges.getMatchingOrgs', getMatchingOrgs);
    server.method('pg.challenges.getMatchingChallenges', getMatchingChallenges);
    server.method('pg.challenges.getArchived', getArchived);
    server.method('pg.challenges.challengesSearch', challengesSearch);
    server.method('pg.challenges.getByOrgId', getByOrgId);
    server.method('pg.challenges.addComment', addComment);
    server.method('pg.challenges.getComments', getComments);

    return next();
  });
}

register.attributes = { name: 'challenges' };

module.exports = register;
