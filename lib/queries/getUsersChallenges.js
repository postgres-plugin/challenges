'use strict';

module.exports = function (userId) {
  return [
    'SELECT',
    'challenges.id AS chal_id,',
    'challenges.title AS chal_title',
    'FROM',
    'challenges',
    'WHERE challenges.creator_id = ' + userId
  ].join(' ');
};
