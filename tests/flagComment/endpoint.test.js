'use strict';

var test = require('tape');

var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');

test('flag comments', function (t) {
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

  var flagComment = {
    method: 'POST',
    url: '/flagComment',
    payload: {id: 1, author_flag: 1}
  }

  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(req, function (res) {
      return server.inject(flagComment, function(res){
        return server.inject(getComments, function(res) {
          t.equal(res.result[0].flagged, true, 'The comment is flagged');
          console.log(res.result);
          t.ok(res.result[0].updated_at > res.result[0].created_at, 'Timestamp updated_at updated');
          return pool.end(function () {
            server.stop(t.end);
          });
        });
      });
    });
  });
});
