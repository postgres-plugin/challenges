'use strict';

var test = require('tape');
var init = require('../../example/server.js');
var config = require('../../config/load-config.js');

var orgs = require('ce100-mock-data').organisations;

// test endpoint
test('search for challenges containing searchTerm in title', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/challengesSearch?searchTerm=ice' }, function (res) {
      t.equal(res.result.length, 1, 'Ice Bucket challenge found');

      t.end();
      pool.end();
      server.stop();
    });
  });
});

test('search for challenges containing searchTerm in description', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/challengesSearch?searchTerm=how much ice?' }, function (res) {
      t.equal(res.result.length, 1, 'Ice Bucket challenge found');

      t.end();
      pool.end();
      server.stop();
    });
  });
});

test('search for challenges containing searchTerm in tags', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/challengesSearch?searchTerm=chemical' }, function (res) {
      t.equal(res.result.length, 2, '2 challenges found linked to the chemical tag');

      t.end();
      pool.end();
      server.stop();
    });
  });
});
