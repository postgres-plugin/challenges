'use strict';

var test = require('tape');

var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');
var challenges = require('../../example/data/challenges.json');

test('edit challenge function', function (t) {
  var chalId = 2;
  var updatedChal = {
    title: 'A more specific Challenge Number 2',
    description: 'I have looked into the possibilities of xyz and wonder whether...'
  };
  var req = {
    method: 'POST',
    url: '/edit?id=' + chalId,
    payload: updatedChal
  };

  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }
    return server.inject(req, function (res) {
      t.deepEqual(res.payload, '[]', 'challenge has been editted!');
      return server.inject({ method: 'GET', url: '/getById?id=2' }, function (res) {
        t.ok(res.payload.indexOf(updatedChal.title) > -1, 'challenge title has been updated!');
        t.ok(res.payload.indexOf(updatedChal.description) > -1, 'challenge description has been updated!');
        return pool.end(function () {
          server.stop(t.end);
        });
      });
    });
  });
});
