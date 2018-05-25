'use strict';

module.exports = function (id) {
  return 'DELETE FROM challenges'
    + ' WHERE challenges.id IN '
    + ' (SELECT challenges.id FROM challenges'
    + ' FULL JOIN comments '
    + ' ON comments.challenge_id = challenges.id'
    + ' WHERE challenges.id = ' + id
    + ' GROUP BY challenges.id'
    + ' HAVING COUNT(comments) = 0 );';
};
