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
    options: { pool: pool }
  }], function (err) {
    if (err) {
      return callback(err);
    }

    server.route([{
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        var obj = {
          title: 'Tea',
          description: 'With milk',
          date: '2016-01-01',
          org_id: 1,
          creator_id: 2,
          active: false
        };

        request.addChallenge(obj, function (error, response) {
          Hoek.assert(!error, 'Add Challenge failed');
          reply(response);
        });
      }
    }]);

    return server.start(function (errorStart) {
      return callback(errorStart, server, pool);
    });
  });
}

module.exports = init;
