'use strict';

var test = require('tape');
var initServer = require('../example/server.js');
var initialTablesData = require('../fixtures/importMockData.js');

var config = require('../config/load-config.js');

function setup (configData, cb) {
  initialTablesData(config, function () {
    initServer(config, function (error, server, pool) {
      if (error) {
        return cb(false);
      }

      return cb(error, server, pool);
    });
  });
}

test('Server start ok', function (t) {
  setup(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject({ method: 'GET', url: '/' }, function (res) {
      t.equal(res.payload, '[]', 'server is up and running!');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});

test('getChallenge for challengeId = 2', function (t) {
  setup(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject({ method: 'GET', url: '/getChallenge' },
      function (res) {
        var expected = {
          creator_id: 3,
          description: 'How can I...?',
          id: 2,
          org_id: 1,
          tags: [
            {
              id: 2,
              name: 'Corporate'
            }
          ],
          title: 'Challenge Number 2'
        };


        t.deepEquals(res.result, expected,
          'getChallengeById returns challenge details and associated tag ids');

        return pool.end(function () {
          server.stop(t.end);
        });
      });
  });
});
