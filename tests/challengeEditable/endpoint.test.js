'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');

var config = require('../../config/load-config.js');


test('check user 3 can edit challenge 1', function (t) {
  initServer(config, function (err, server, pool) {
    t.ok(!err, 'error setting up server: ' + err)

    return server.inject({ url: '/challengeEditable?userId=3&chalId=1' }, function (res) {
      t.equal(res.result[0].exists, true, 'challenge 1 is editable by user 3');
      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});

test('check user 1 cant edit challenge 1', function (t) {
  initServer(config, function (err, server, pool) {
    t.ok(!err, 'error setting up server: ' + err)

    return server.inject({ url: '/challengeEditable?userId=1&chalId=1' }, function (res) {
      t.equal(res.result[0].exists, false, 'challenge 1 is not editable by user 1');
      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
