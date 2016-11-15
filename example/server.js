'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var challenges = require('../lib/index.js');
var pg = require('pg');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);

  server.connection({ port: config.port });

  server.register([{
    register: challenges,
    options: {
      pool: pool,
      database: config.pg.database
    }
  }], function (err) {
    if (err) {
      return callback(err);
    }

    server.route([{
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        return reply('hello');
      }
    }]);

    return server.start(function (errorStart) {
      return callback(errorStart, server, pool);
    });
  });
}

module.exports = init;
