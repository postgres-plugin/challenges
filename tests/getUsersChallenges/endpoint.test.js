'use strict';

var test = require('tape');
var config = require('../../config/load-config.js');
var init = require('../../example/server.js');

test('get challenges of a user', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/people/1' }, function (res) {
      t.equal(res.result.length, 2, 'User 1 has two active challenges');

      t.end();
      pool.end();
      server.stop();
    });
  });
});
