'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');

function byTagsLength (a, b) {
  return a.tags.length < b.tags.length;
}

function getOrgName (org) {
  return org.name;
}

function cloneArr (arr) {
  return arr.map(function (obj) { return Object.assign({}, obj); });
}


test('getByTag endpoint for challenge 5 - a challenge with no tags', function (t) {
  initServer(config, function (err, server, pool) {
    t.ok(!err, 'error starting server: ' + err);
    var options = { url: '/getMatchingOrgs?chal_id=5' };

    server.inject(options, function (response) {
      var actual = response.result;

      t.equal(actual.length, 0, 'there are 0 organisations that are suggested');

      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});


test('getByTag endpoint for challenge 2 - a challenge with tags but no matches', function (t) {
  initServer(config, function (err, server, pool) {
    t.ok(!err, 'error starting server: ' + err);
    var options = { url: '/getMatchingOrgs?chal_id=2' };

    server.inject(options, function (response) {
      var actual = response.result;
      t.equal(actual.length, 0, 'there are 0 organisations that are suggested');

      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});
