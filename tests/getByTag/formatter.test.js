'use strict';

var test = require('tape');
var getByTag = require('../../lib/formatters/getByTag.js');


var rows = [{
  tid: 8,
  tags_name: 'Automotive and Transport Manufacturing',
  chal_id: 3,
  chal_date: '2016-12-07T15:40:58.195Z',
  chal_title: 'Challenge Number 4',
  chal_description: 'Who should I...?',
  org_name: 'dwyl',
  org_id: 1,
  filter_id: null,
  filter_name: null
}, {
  tid: 10,
  tags_name: 'Chemicals',
  chal_id: 3,
  chal_date: '2016-12-07T15:40:58.195Z',
  chal_title: 'Challenge Number 4',
  chal_description: 'Who should I...?',
  org_name: 'dwyl',
  org_id: 1,
  filter_id: null,
  filter_name: null
}, {
  chal_id: 6,
  chal_date: '2016-12-07T15:40:58.195Z',
  chal_title: 'Challenge Number 6',
  chal_description: 'What is the best way to...?',
  org_name: 'dwyl',
  org_id: 1,
  filter_id: null,
  filter_name: null
}];

var formatted = {
  filter: null,
  challenges: [{
    id: 3,
    date: '2016-12-07T15:40:58.195Z',
    title: 'Challenge Number 4',
    description: 'Who should I...?',
    org_id: 1,
    shared_by: 'dwyl',
    tags: [{
      tag_id: 8,
      tag_name: 'Automotive and Transport Manufacturing'
    }, {
      tag_id: 10,
      tag_name: 'Chemicals'
    }]
  }, {
    id: 6,
    date: '2016-12-07T15:40:58.195Z',
    title: 'Challenge Number 6',
    description: 'What is the best way to...?',
    org_id: 1,
    shared_by: 'dwyl',
    tags: []
  }]
};

test('getByTag formatter helper function', function (t) {
  t.deepEqual(getByTag(rows), formatted,
    'getByTag formatter takes rows from db and builds up tags array '
    + 'if multiple tags per challenge');

  var noResultsExpected = { challenges: [], filter: null }
  t.deepEqual(getByTag([]), noResultsExpected, 'getByTag formatter '
  + 'takes an empty array and returns an empty array');
  t.end();
});
