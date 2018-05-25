'use strict';

var test = require('tape');
var init = require('../../example/server.js');
var config = require('../../config/load-config.js');

function deleteChallenge (id) {
  return {
    method: 'POST',
    url: '/deleteChallenge?id=' + id
  };
}

var comment = {
  author_id: 1,
  comment: 'Comment challenge',
  flagged: false,
  author_flag: 'null',
  challenge_id: 3,
  active: true
};

test('Delete challenge', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }
    server.inject(deleteChallenge(1), function (res) {
      t.equal(res.statusCode, 200, 'Challenge deleted');
      t.equal(res.payload, '[]', 'return an empty array');
      t.end();
      pool.end()
      server.stop()
    });
  });
});

test('Fail to Delete challenge', function (t) {
  init(config, function (err, server, pool) {
    if (err) {
      console.log('error initialise server', err);
      return t.fail();
    }

    server.inject({method: 'POST', url: '/addComment', payload: comment}, function (res) {

      server.inject(deleteChallenge(3), function (res) {
        t.equal(res.statusCode, 500, 'Challenge with comments can not be deleted');
        return pool.end(function () {
          server.stop(t.end);
        });
      });
    });
  });
});
