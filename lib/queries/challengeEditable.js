'use strict';

module.exports = function (challengeId, userId) {
  return [
    'SELECT',
    'EXISTS (',
      'SELECT',
      'id FROM challenges',
      'WHERE id = ' + challengeId,
      'AND creator_id = ' + userId,
    ')'].join(' ');
};
