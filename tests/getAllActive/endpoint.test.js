'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');

var config = require('../../config/load-config.js');


test('getAllActive endpoint returns correct challenges', function (t) {
  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject({ method: 'GET', url: '/getAllActive' }, function (res) {
      t.equal(res.result.challenges.length, 4, '4 active challenges returned');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
