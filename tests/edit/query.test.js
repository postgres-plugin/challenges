'use strict';

var test = require('tape');
var edit = require('../../lib/queries/edit.js');
var chalId = 2;
var updatedChal = {
  title: 'A more specific Challenge Number 2',
  description: 'I have looked into the possibilities of xyz and wonder whether...'
};
var query = [
  'UPDATE challenges',
  'SET title = \'A more specific Challenge Number 2\',',
  'description = \'I have looked into the possibilities of xyz and wonder whether...\'',
  'WHERE id = ' + chalId + ' ;'
].join(' ');

test('edit query string', function (t) {
  t.equal(edit(chalId, updatedChal), query,
    'edit function takes an object and outputs a valid query string');
  t.end();
});
