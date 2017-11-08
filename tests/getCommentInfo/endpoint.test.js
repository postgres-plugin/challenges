'use strict';

var test = require('tape');

var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');
var challenges = require('ce100-mock-data').challenges;

test('get comment', function (t) {
  var comment = {
    author_id: 1,
    comment: 'Comment challenge',
    flagged: true,
    author_flag: 2,
    challenge_id: 1,
    active: true
  };

  var req = {
    method: 'POST',
    url: '/addComment',
    payload: comment
  };

  var getCommentInfo = {
    method: 'GET',
    url: '/getCommentInfo?id=1'
  }

  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(req, function (res) {
        return server.inject(getCommentInfo, function(res) {
          var info = res.result[0];
          t.equal(info.author_first_name, 'Alex', 'Alex is the author of the comment');
          t.equal(info.flagger_first_name, 'Marie', 'Marie flagged the comment');
          return pool.end(function () {
            server.stop(t.end);
          });
        })
    });
  });
});
