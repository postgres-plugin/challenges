'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');

var config = require('../../config/load-config.js');


test('checkEditable returns true if a challenge is editable', function (t) {
  initServer(config, function (err, server, pool) {
    t.ok(!err, 'error setting up server: ' + err)

    return server.inject({ url: '/checkEditable?userId=3&chalId=3' }, function (res) {
      t.ok(res.result, 'challenge id 3 is editable by user with id 3');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});


test('checkEditable returns false if a challenge is not editable', function (t) {
  initServer(config, function (err, server, pool) {
    t.ok(!err, 'error setting up server: ' + err)

    return server.inject({ url: '/checkEditable?userId=3&chalId=5' }, function (res) {
      t.notOk(res.result, 'challenge id 5 is editable by user with id 3');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
