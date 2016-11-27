'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');

var config = require('../../config/load-config.js');


test('add Challenge function', function (t) {
  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject({ method: 'GET', url: '/' }, function (res) {
      t.equal(res.payload, '[]', 'challenge was added!');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
