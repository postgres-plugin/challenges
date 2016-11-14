'use strict';

var tape = require('tape');
var init = require('../example/server.js');
var server, pgPool;

var config = {
  user: 'postgres',
  database: 'tags',
  password: '',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

// Tests assume we have a table called tags which is empty

// set up server
tape('set up server', function (t) {
  init(0, config, function (err, newServer, newpgPool) { // eslint-disable-line
    if (err) {
      return t.fail();
    }
    server = newServer;
    pgPool = newpgPool;

    return t.end();
  });
});


tape('check that plugin is being attached to the request object', function (t) {
  server.inject({
    method: 'GET',
    url: '/'
  }, function (res) {
    t.equal(res.statusCode, 200,
      'Looks for the endpoint where method is attached to request object.');
    t.end();
  });
});


tape('teardown', function (t) {
  pgPool.end(function () {
    t.end();
  });
});
