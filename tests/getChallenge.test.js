'use strict';

var test = require('tape');
var getChallenge = require('../lib/queries/getChallenge.js');

var query = 'SELECT * FROM challenges WHERE id = 10';

test('getChallenge query string', function (t) {
  t.equal(getChallenge(10), query,
    'getChallenge function takes an object and outputs a valid query string');
  t.end();
});
