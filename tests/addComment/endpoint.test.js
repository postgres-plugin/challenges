'use strict';

var test = require('tape');

var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');
var challenges = require('ce100-mock-data').challenges;

test('add Challenge function', function (t) {
  var comment = {
    author_id: 1,
    comment: 'Comment challenge',
    flagged: false,
    author_flag: 'null',
    challenge_id: 1,
    active: true
  };

  var req = {
    method: 'POST',
    url: '/addComment',
    payload: comment
  };
  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(req, function (res) {
      t.equal(res.result[0].id, 1, 'The comment has been added')
      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
