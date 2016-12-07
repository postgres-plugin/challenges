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
  filter_tag: null
}, {
  tid: 10,
  tags_name: 'Chemicals',
  chal_id: 3,
  chal_date: '2016-12-07T15:40:58.195Z',
  chal_title: 'Challenge Number 4',
  chal_description: 'Who should I...?',
  org_name: 'dwyl',
  org_id: 1,
  filter_tag: null
}];

var formatted = {
  filter_tag: undefined,
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
  }]
};

test('getByTag formatter helper function', function (t) {
  t.deepEqual(getByTag(rows), formatted,
    'getByTag formatter takes rows from db and builds up tags array '
    + 'if multiple tags per challenge');

  var noResultsExpected = { challenges: [], filter_tag: undefined }
  t.deepEqual(getByTag([]), noResultsExpected, 'getByTag formatter '
  + 'takes an empty array and returns an empty array');
  t.end();
});
