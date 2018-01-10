'use strict';

module.exports = function (orgId) {
  return [
    'SELECT',
    'challenges.id AS chal_id,',
    'challenges.date AS chal_date,',
    'challenges.title AS chal_title,',
    'challenges.creator_id AS creator_id,',
    'people.first_name AS creator_first_name,',
    'people.last_name AS creator_last_name,',
    'people.active AS creator_active',
    'FROM challenges',
    'JOIN people on challenges.creator_id = people.id',
    'WHERE challenges.active = true',
    'AND challenges.org_id = ' + orgId,
    'ORDER BY challenges.date DESC,',
    'challenges.title ASC;'
  ].join(' ');
};
