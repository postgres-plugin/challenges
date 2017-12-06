'use strict';

var test = require('tape');

var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');
var challenges = require('ce100-mock-data').challenges;

test('get archived challenges for user id 1', function (t) {
  var userId = 3;

  var req = {
    method: 'GET',
    url: '/people/' + userId + '/archived-challenges'
  };
  var expectedChallengeArray = [{
    id: 1,
    title: 'Challenge Number 1',
    description: 'What can I...?',
    org_id: 1,
    creator_id: 3 }]

  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }
    return server.inject(req, function (res) {
      t.deepEqual(res.result, expectedChallengeArray, 'user with id 1 has 1 inactive challenge associated with it')
      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
