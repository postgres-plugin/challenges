'use strict';

var test = require('tape');
var init = require('../../example/server.js');
var config = require('../../config/load-config.js');

var orgs = require('ce100-mock-data').organisations;

test('search for challenges containing searchTerm in description', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/challengesSearch?searchTerm=how much ice?' }, function (res) {
      t.equal(res.result.length, 0, 'Ice Bucket challenge not display as inactive');

      t.end();
      pool.end();
      server.stop();
    });
  });
});
