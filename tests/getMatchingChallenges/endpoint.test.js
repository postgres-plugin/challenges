'use strict';

var test = require('tape');

var config = require('../../config/load-config.js');

var initServer = require('../../example/server.js');

// org.active = true and chal.active = false
test('getMatchingChallenges for challengeId = 1', function (t) {
  initServer(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    var req = {
      method: 'GET',
      url: '/getMatchingChallenges?listOfTags=69&listOfTags=11&chal_id=1'
    };

    return server.inject(req, function (res) {
      t.equal(res.result.length, 3, 'Tests that 3 results match tags 69 and 11')

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
