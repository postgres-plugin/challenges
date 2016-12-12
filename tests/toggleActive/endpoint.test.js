'use strict';

var test = require('tape');
var init = require('../../example/server.js');
var config = require('../../config/load-config.js');

test('disable an active challenge', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    var active = {
      id: 2,
      title: 'Challenge Number 2',
      description: 'How can I...?',
      creator_id: 3,
      org_id: 1,
      org_name: 'Apple',
      tags: [ { id: 2, name: 'Corporate' } ]
    };

    server.inject({
      method: 'GET',
      url: '/getById?id=2'
    }, function (res) {
      t.deepEqual(res.result, active, 'empty array returned because chal is deactivated');

      server.inject({
        method: 'POST',
        url: '/toggleActive?id=2'
      }, function (res) {

        t.deepEqual(res.payload, '[]', 'successful disabling of challenge returns an empty array');

        server.inject({
          method: 'GET',
          url: '/getById?id=2'
        }, function (res) {
          t.equal(res.payload, '[]', 'empty array returned because chal is deactivated');

          t.end();
          pool.end()
          server.stop()
        });
      });
    });
  });
});

// test enabling challenge
test('enable an inactive challenge', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject({
      method: 'POST',
      url: '/toggleActive?id=8'
    }, function (res) {
      t.deepEqual(res.result, [], 'successful enabling of chal returns an empty array');

      server.inject({
        method: 'GET',
        url: '/getById?id=8'
      }, function (res) {
        t.ok(res.result, 'the toggle active function has enabled the previously inactive chal');

        t.end();
        pool.end()
        server.stop()
      });
    });
  });
});


// disable non-existent chal
test('attempt to toggle a non-existent chal', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject({
      method: 'POST',
      url: '/toggleActive?id=10000'
    }, function (res) {
      t.equal(res.statusCode, 404, 'Update a chal that doest exist returns a 404');

      t.end();
      pool.end()
      server.stop()
    });
  });
});
