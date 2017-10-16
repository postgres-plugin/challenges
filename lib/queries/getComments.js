'use strict';

module.exports = function (challengeId) {
  return [
    'SELECT',
    'id,',
    'comment',
    'FROM',
    'comments',
    'WHERE challenge_id = ' + challengeId
  ].join(' ');
};
