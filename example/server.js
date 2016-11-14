'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var fs = require('fs');

var server = new Hapi.Server();

var challenges = require('../lib/index.js');
var pg = require('pg');


function init (port, pgConfig, callback) {
  var pgPool = new pg.Pool(pgConfig);

  server.connection({ port: port });

  server.route([{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      return reply('hello');
    }
  }]);

  server.register([{
    register: challenges,
    options: {
      pgPool: pgPool,
      database: pgConfig.database
    }
  }], function (err) {
    Hoek.assert(!err, err);

    return callback(null, server, pgPool);
  });
}

module.exports = init;
