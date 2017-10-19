'use strict';

var test = require('tape');

var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');
var challenges = require('ce100-mock-data').challenges;

test('get comments', function (t) {
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

  var getComments = {
    method: 'GET',
    url: '/getComments?id=1'
  }

  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(req, function (res) {
        return server.inject(getComments, function(res) {
          t.equal(res.result.length, 1, 'There is 1 comment')
          return pool.end(function () {
            server.stop(t.end);
          });
        })
    });
  });
});
