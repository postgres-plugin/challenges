'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');

test('attach pg.challenges to the request object', function (t) {
  initServer(config, function (err, server, pool) {
    server.inject({ url: '/' }, function (response) {
      t.equal(typeof response.request.server.methods.pg.challenges, 'object',
      'request.pg.challenges has been attached to the request by the plugin');
      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
