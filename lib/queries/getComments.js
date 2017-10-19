'use strict';

module.exports = function (challengeId) {
  return [
    'SELECT',
    'comments.id,',
    'comment,',
    'comments.created_at,',
    'comments.updated_at,',
    'people.first_name AS people_first_name,',
    'people.last_name AS people_last_name,',
    'people.logo_url AS people_logo_url,',
    'organisations.name AS org_name',
    'FROM',
    'comments',
    'JOIN people on author_id = people.id',
    'LEFT OUTER JOIN organisations on people.org_id = organisations.id',
    'WHERE challenge_id = ' + challengeId,
    'AND comments.active = true',
    'ORDER BY comments.created_at DESC'
  ].join(' ');
};
