'use strict';

var getByTagsAndLocations = require('./getByTagsAndLocations.js');

module.exports = function (searchTerm, tags, locations) {
  var challengeQuery = [
    'SELECT',
    'challenges.id AS chal_id,',
    'challenges.title AS chal_title,',
    'challenges.description AS chal_description,',
    'challenges.date AS chal_date,',
    'challenges.creator_id AS creator_id,',
    'people.first_name AS creator_first_name,',
    'people.last_name AS creator_last_name,',
    'organisations.id AS org_id,',
    'organisations.name AS org_name',
    'FROM challenges',
    'JOIN organisations',
    'ON challenges.org_id = organisations.id',
    'JOIN people ON challenges.creator_id = people.id',
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
