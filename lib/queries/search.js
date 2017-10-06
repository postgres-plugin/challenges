'use strict';

module.exports = function (searchTerm) {
  var challengeQuery = [
    'SELECT',
    'challenges.id,',
    'title,',
    'description,',
    'name AS org_name,',
    'organisations.id AS org_id',
    'FROM challenges',
    'JOIN organisations',
    'ON challenges.org_id = organisations.id',
    'WHERE challenges.active = true',
    'AND (LOWER(title) like \'%' + searchTerm + '%\'',
    'OR LOWER(description) like \'%' + searchTerm + '%\')'
  ];

  var challengesTagQuery = [
    'SELECT',
    'challenges.id,',
    'title,',
    'description,',
    'organisations.name AS org_name,',
    'organisations.id AS org_id',
    'FROM challenges',
    'JOIN organisations',
    'ON challenges.org_id = organisations.id',
    'JOIN tags_challenges',
    'ON tags_challenges.challenges_id = challenges.id',
    'JOIN tags',
    'ON tags_challenges.tags_id = tags.id',
    'WHERE LOWER(tags.name) like \'%' + searchTerm + '%\'',
    'AND challenges.active = true',
    'ORDER BY id ASC;'
  ];

  return challengeQuery.concat(['UNION'], challengesTagQuery).join(' ');
};
