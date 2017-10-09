'use strict';

module.exports = function (orgId) {
  return [
    'SELECT',
    'challenges.id AS chal_id,',
    'challenges.date AS chal_date,',
    'challenges.title AS chal_title',
    'FROM challenges',
    'WHERE challenges.active = true',
    'AND challenges.org_id = ' + orgId,
    'ORDER BY challenges.date DESC,',
    'challenges.title ASC;'
  ].join(' ');
};
