'use strict';

var test = require('tape');
var add = require('../../lib/queries/add.js');
var challengeObj = {
  title: 'Tea',
  description: 'With milk',
  org_id: 1,
  creator_id: 2,
  active: true
};
var query = 'INSERT INTO challenges ( '
  + 'title, description, org_id, creator_id, active ) VALUES '
  + '( \'Tea\', \'With milk\', 1, 2, true ) '
  + 'RETURNING id;';


test('add query string', function (t) {
  t.equal(add(challengeObj), query,
    'add function takes an object and outputs a valid query string');
  t.end();
});
