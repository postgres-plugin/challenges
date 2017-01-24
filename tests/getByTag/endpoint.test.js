'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');

test('getByTag endpoint', function (t) {
  initServer(config, function (err, server, pool) {
    var options = { url: '/getByTag?tagId=9' };

    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(options, function (response) {
      var filter = response.result.filter;
      var expectedFilter = { id: 9, name: 'Automotive and Transport Manufacturing' };
      t.deepEqual(filter, expectedFilter, 'the filter tag returns the correct object');

      var challenges = response.result.challenges;

      t.equal(challenges.length, 1,
        'Only one challenge returns when filtering by tag with id 9');

      t.ok(challenges[0].title.indexOf('Challenge Number 4') > -1,
        'Title of the active challenge in returned correctly');

      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});

test('getByTag function when there is no match', function (t) {
  initServer(config, function (err, server, pool) {
    var options = { url: '/getByTag?tagId=1' };

    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(options, function (response) {
      var filter = response.result.filter;
      var expectedFilter = { id: 1, name: 'Global Partner' };
      t.deepEqual(filter, expectedFilter, 'the filter tag returns the correct object');

      var challenges = response.result.challenges;
      t.deepEqual(challenges, [], 'challenges is empty when there are no matches');

      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});
