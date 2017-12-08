'use strict';

module.exports = function (challenge_id) {
  return [
    'SELECT',
    'organisations.id AS org_id,',
    'organisations.name AS org_name,',
    'organisations.logo_url AS org_logo_url,',
    'tags_organisations.tags_id AS tag_id',
    'FROM',
    'organisations',
    'JOIN tags_organisations',
    'ON tags_organisations.organisations_id = organisations.id',
    'JOIN tags_challenges',
    'ON tags_organisations.tags_id = tags_challenges.tags_id',
    'JOIN challenges',
    'ON challenges.id = tags_challenges.challenges_id',
    'WHERE challenges.id = ' + challenge_id,
    'AND organisations.id <> challenges.org_id',
    'AND organisations.active = TRUE;'
  ].join(' ');
};
