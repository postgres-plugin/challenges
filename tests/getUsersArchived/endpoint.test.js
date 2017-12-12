'use strict';

var test = require('tape');

var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');
var challenges = require('ce100-mock-data').challenges;

test('get archived challenges for user id 3', function (t) {
  var userId = 3;

  var req = {
    method: 'GET',
    url: '/people/' + userId + '/archived-challenges'
  };

  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }
    return server.inject(req, function (res) {
      t.equal(res.result.length, 2,'user with id 3 has 2 inactive challenges' )
      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
