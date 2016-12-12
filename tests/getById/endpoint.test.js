'use strict';

var test = require('tape');

var config = require('../../config/load-config.js');

var initServer = require('../../example/server.js');

function getChallenge (tag) {
  return {
    method: 'GET',
    url: '/getById?id=' + tag
  };
}

// org.active = true and chal.active = false
test('getById for challengeId = 1', function (t) {
  initServer(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject(getChallenge(1), function (res) {
      var expected = '[]';

      t.deepEquals(res.payload, expected,
        'returns empty array for inactive chal from active org');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});

// org.active = true, chal.active = true. with tags
test('getById for challengeId = 2', function (t) {
  initServer(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject(getChallenge(2), function (res) {
      var expected = [{
        creator_id: 3,
        description: 'How can I...?',
        id: 2,
        org_id: 1,
        org_name: 'Apple',
         tags: [
          {
            id: 2,
            name: 'Corporate'
          }
        ],
        title: 'Challenge Number 2'
      }];

      t.deepEquals(res.result, expected,
        'returns challenge details and associated tag ids');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});

// org.active = true and chal.active = true. No tags
test('getById for challengeId = 5', function (t) {
  initServer(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject(getChallenge(5), function (res) {
      var expected = [{
        creator_id: 4,
        description: 'How have...?',
        id: 5,
        org_id: 2,
        org_name: 'dwyl',
        tags: [],
        title: 'Challenge Number 5'
      }];

      t.deepEquals(res.result, expected,
        'returns challenge details and empty array for tags');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});

// org.active = true, chal.active = false. No tags
test('getById for challengeId = 9', function (t) {
  initServer(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject(getChallenge(9), function (res) {
      var expected = '[]';

      t.deepEquals(res.payload, expected,
        'empty array returned for inactive chal of an active org');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});

// org.active = false, chal.active = false. No tags
test('getById for challengeId = 10', function (t) {
  initServer(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject(getChallenge(10), function (res) {
      var expected = '[]';

      t.deepEquals(res.payload, expected,
        'empty array returned for inactive chal of an inactive org');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});

// non-existent challenge returns empty array
test('getById for challengeId = 500', function (t) {
  initServer(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject(getChallenge(500), function (res) {
      var expected = '[]';
      t.deepEquals(res.payload, expected,
        'empty array returned for non-existent chal');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
