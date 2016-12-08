'use strict';

module.exports = function (userId, chalId) {
  return [
    'SELECT',
    'challenges.id as chid, challenges.title as chal_title,',
    'people.first_name',
    'FROM people',
    'JOIN challenges',
    'ON people.org_id = challenges.org_id',
    'where people.id = ',
    userId,
    'AND challenges.id = ',
    chalId,
    ';'].join(' ');
};
