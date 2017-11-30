'use strict';

module.exports = function (challengeId) {
  return [
    'SELECT',
    'challenges.id AS chal_id,',
    'people.id AS people_id,',
    'people.first_name AS people_first_name,',
    'people.last_name AS people_last_name,',
    'people.email AS people_email,',
    'people.active AS people_active,',
    'people.notification_email AS people_notification_email',
    'FROM',
    'challenges',
    'JOIN people on challenges.creator_id = people.id',
    'WHERE challenges.id = ' + challengeId,
  ].join(' ');
};
