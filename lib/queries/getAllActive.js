'use strict';

module.exports = function () {
  return [
    'SELECT',
    'organisations.id AS org_id,',
    'organisations.name AS org_name,',
    'challenges.id AS chal_id,',
    'challenges.date AS chal_date,',
    'challenges.title AS chal_title,',
    'challenges.description AS chal_description,',
    'tags.id AS tid,',
    'tags.name AS tags_name',
    'FROM tags',
    'JOIN tags_challenges',
    'ON tags_challenges.tags_id = tags.id',
    'RIGHT OUTER JOIN challenges',
    'ON challenges.id = tags_challenges.challenges_id',
    'JOIN organisations',
    'ON organisations.id = challenges.org_id',
    'WHERE tags.active IS NOT FALSE',
    'AND challenges.active = true',
    'AND organisations.active = true',
    'ORDER BY challenges.date DESC,',
    'challenges.title ASC;'
  ].join(' ');
};
