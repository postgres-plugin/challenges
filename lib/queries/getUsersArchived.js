'use strict';

module.exports = function (userId) {
  return [
    'SELECT',
    'challenges.id AS chal_id,',
    'challenges.title AS chal_title,',
    'challenges.creator_id AS creator_id',
    'FROM',
    'challenges',
    'WHERE challenges.creator_id = ' + userId,
    'AND active = FALSE ORDER BY date desc;'
  ].join(' ');
};
