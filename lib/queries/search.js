'use strict';

var getByTagsAndLocations = require('./getByTagsAndLocations.js');

module.exports = function (searchTerm, tags, locations) {
  var challengeQuery = [
    'SELECT',
    'challenges.id,',
    'title,',
    'description,',
    'date AS chal_date,',
    'organisations.id AS org_id,',
    'name AS org_name',
    'FROM challenges',
    'JOIN organisations',
    'ON challenges.org_id = organisations.id',
    'WHERE challenges.active = true',
    'AND (LOWER(title) like \'%' + searchTerm + '%\'',
    'OR LOWER(description) like \'%' + searchTerm + '%\')'
  ];

  if (tags.length || locations.length) {
    return challengeQuery.concat(['UNION'], getByTagsAndLocations(tags, locations)).join(' ');
  } else {
    return challengeQuery.join(' ');
  }
};
