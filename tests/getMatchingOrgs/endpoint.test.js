'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');

function byTagsLength (a, b) {
  return a.tags.length < b.tags.length;
}

function getOrgName (org) {
  return org.org_name;
}

function cloneArr (arr) {
  return arr.map(function (obj) { return Object.assign({}, obj); });
}

test('getByTag endpoint for challenge 8', function (t) {
  initServer(config, function (err, server, pool) {
    t.ok(!err, 'error starting server: ' + err);
    var options = { url: '/getMatchingOrgs?chal_id=8' };

    server.inject(options, function (response) {
      var actual = response.result;
      t.equal(actual.length, 2, 'there are 2 organisations that are suggested');

      // check that the number of tags that each org has matched by determines the order
      // var order = actual.map(function (org) { return org.org_name });
      var expectedOrder = cloneArr(actual).sort(byTagsLength).map(getOrgName);
      var actualOrder = actual.map(getOrgName);
      t.deepEqual(actualOrder, expectedOrder, 'the suggested matches are in order of how many tags matched.')

      var expectedNames = ['Asda', 'EMF'];
      var actualNames = actual.map(getOrgName);
      t.deepEqual(actualNames, expectedNames, 'the correct organisations are suggested');

      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});


test('getByTag endpoint for challenge 4', function (t) {
  initServer(config, function (err, server, pool) {
    t.ok(!err, 'error starting server: ' + err);
    var options = { url: '/getMatchingOrgs?chal_id=4' };

    server.inject(options, function (response) {
      var actual = response.result;
      t.equal(actual.length, 3, 'there are 3 organisations that are suggested');

      // check that the number of tags that each org has matched by determines the order
      // var order = actual.map(function (org) { return org.org_name });
      var expectedOrder = actual.sort(byTagsLength).map(getOrgName);
      var actualOrder = actual.map(getOrgName);
      t.deepEqual(actualOrder, expectedOrder, 'the suggested matches are in order of how many tags matched.')

      var expectedNames = ['Asda', 'EMF', 'Co-op Group'];
      var actualNames = actual.map(getOrgName);
      t.deepEqual(actualNames, expectedNames, 'the correct organisations are suggested');

      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});


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
