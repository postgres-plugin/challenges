'use strict';

var test = require('tape');

var config = require('../../config/load-config.js');

var initServer = require('../../example/server.js');

function endpoint (tag) {
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

    return server.inject(endpoint(1), function (res) {
      var expected = '[]';

      t.deepEquals(res.payload, expected,
        'returns empty object for inactive chal from active org');

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

    return server.inject(endpoint(2), function (res) {
      var expected = {
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
      };

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

    return server.inject(endpoint(5), function (res) {
      var expected = {
        creator_id: 4,
        description: 'How have...?',
        id: 5,
        org_id: 2,
        org_name: 'dwyl',
        tags: [],
        title: 'Challenge Number 5'
      };

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

    return server.inject(endpoint(9), function (res) {
      var expected = '[]';

      t.deepEquals(res.payload, expected,
        'empty object returned for inactive chal of an active org');

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

    return server.inject(endpoint(10), function (res) {
      var expected = '[]';

      t.deepEquals(res.payload, expected,
        'empty object returned for inactive chal of an inactive org');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});


// QUESTION FOR @JMURPHYWEB AND @SIMONLAB, DO WE WANT TO RETURN {} FOR NON-EXISTENT CHALLENGES?
// non-existent challenge returns *empty object*
test('getById for challengeId = 9', function (t) {
  initServer(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject(endpoint(500), function (res) {
      t.deepEquals(res.result, {},
        'getById returns challenge details and associated tag ids');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
