'use strict';

var test = require('tape');

var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');
var challenges = require('ce100-mock-data').challenges;

test('add Challenge function', function (t) {
  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject({ method: 'GET', url: '/' }, function (res) {
      t.deepEqual(res.result, [{ id: challenges.length + 1 }], 'challenge was added!');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
