'use strict';

module.exports = function (userId, chalId) {
  return [
    'SELECT',
    'challenges.id as chid',
    'FROM people',
    'JOIN challenges',
    'ON people.org_id = challenges.org_id',
    'where people.id = ',
    userId,
    'AND challenges.id = ',
    chalId,
    'AND people.user_type = \'primary\'',
    ';'].join(' ');
};
