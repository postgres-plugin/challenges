'use strict';

module.exports = function (challengeId) {
  return [
    'SELECT',
    'challenges.id AS id,',
    'challenges.title AS title,',
    'challenges.description AS description,',
    'challenges.creator_id AS creator_id,',
    'challenges.org_id AS org_id,',
    'challenges.active AS active,',
    'organisations.name AS org_name,',
    'tags_challenges.tags_id AS tags_id,',
    'locations_challenges.locations_id AS locations_id',
    'FROM organisations',
    'RIGHT OUTER JOIN challenges',
    'ON (challenges.org_id = organisations.id)',
    'LEFT OUTER JOIN tags_challenges',
    'ON (tags_challenges.challenges_id = challenges.id)',
    'LEFT OUTER JOIN locations_challenges',
    'ON (locations_challenges.challenges_id = challenges.id)',
    'WHERE organisations.active = true',
    'AND challenges.id = ' + challengeId + ';'
  ].join(' ');
};
