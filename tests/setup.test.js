'use strict';

var test = require('tape');
var initServer = require('../example/server.js');
var initialTablesData = require('../fixtures/importMockData.js');

var config = require('../config/load-config.js');


test('Server start ok', function (t) {
  initialTablesData(config, function () {
    initServer(config, function (err, server, pool) {
      if (err) {
        return t.fail('Error starting the server, error: ', err);
      }

      return server.inject({ method: 'GET', url: '/' }, function (res) {
        t.equal(res.payload, '[]', 'server is up and running!');

        return pool.end(function () {
          server.stop(t.end);
        });
      });
    });
  });
});
