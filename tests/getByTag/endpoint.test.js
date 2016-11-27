'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');

test('getByTag endpoint', function (t) {
  initServer(config, function (err, server, pool) {
    var options = { url: '/getByTag?tagId=69' };

    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(options, function (response) {
      var challenges = response.result.challenges;

      t.equal(challenges.length, 2,
        'Two challenges returned when filtering by tag with id 68');

      t.equal(challenges[0].tags.length, 4,
        'First challenge has 4 tags attached');

      t.equal(challenges[1].tags.length, 1,
        'Two challenges returned when filtering by tag with id 68');


      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});
