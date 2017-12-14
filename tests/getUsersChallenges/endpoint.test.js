'use strict';

var test = require('tape');
var config = require('../../config/load-config.js');
var init = require('../../example/server.js');

test('get challenges of a user', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/people/3/challenges' }, function (res) {
      t.equal(res.result.length, 2, 'User 3 has 2 active challenges');

      t.end();
      pool.end();
      server.stop();
    });
  });
});
