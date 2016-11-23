'use strict';

var test = require('tape');
var initServer = require('../example/server.js');
var initialTablesData = require('../fixtures/importMockData.js');
var config = require('../config/load-config.js');

module.exports = function setup (configData, cb) {
  initialTablesData(config, function () {
    initServer(config, function (error, server, pool) {
      if (error) {
        return cb(error);
      }

      return cb(error, server, pool);
    });
  });
}
