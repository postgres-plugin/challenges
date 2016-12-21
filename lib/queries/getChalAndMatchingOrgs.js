'use strict'

module.exports = function (challenge_id) {
  return [
    'SELECT',
    'tags_organisations.organisations_id AS or_id,',
    'organisations.name AS org_name,',
    'tags.name AS tag_name,',
    'challenges.id AS ch_id, challenges.title AS title, challenges.description AS description,',
    'challenges.creator_id AS creator_id, challenges.org_id AS org_id, challenges.active AS active',
    'FROM',
    'tags_challenges',
    'JOIN tags_organisations',
    'ON tags_challenges.tags_id = tags_organisations.tags_id',
    'JOIN organisations',
    'ON tags_organisations.organisations_id = organisations.id',
    'JOIN tags',
    'ON tags.id = tags_challenges.tags_id',
    'JOIN challenges',
    'ON challenges.id = tags_challenges.challenges_id',
    'WHERE challenges.id = ' + challenge_id,
    //'--exclude the links to users own org',
    'AND organisations.id <> challenges.org_id',
    'AND organisations.active = TRUE',
    'AND tags.active = TRUE',
    'ORDER BY',
    'tags_challenges.challenges_id',
    ';'
  ].join(' ');
}
