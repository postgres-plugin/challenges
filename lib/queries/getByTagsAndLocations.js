'use strict';

module.exports = function (tagIds, locationsIds) {
  var tagQuery = [
    'SELECT',
    'challenges.id AS chal_id,',
    'challenges.title AS chal_title,',
    'challenges.description AS chal_description,',
    'challenges.date AS chal_date,',
    'challenges.creator_id AS creator_id,',
    'people.first_name AS creator_first_name,',
    'people.last_name AS creator_last_name,',
    'organisations.id AS org_id,',
    'organisations.name AS org_name',
    'FROM challenges',
    'JOIN organisations ON organisations.id = challenges.org_id',
    'JOIN tags_challenges ON tags_challenges.challenges_id = challenges.id',
    'JOIN people on challenges.creator_id = people.id',
    'WHERE tags_challenges.tags_id IN ' + convert(tagIds),
    'AND challenges.active is not false'
  ]

  var locationQuery = [
    'SELECT',
    'challenges.id AS chal_id,',
    'challenges.title AS chal_title,',
    'challenges.description AS chal_description,',
    'challenges.date AS chal_date,',
    'challenges.creator_id AS creator_id,',
    'people.first_name AS creator_first_name,',
    'people.last_name AS creator_last_name,',
    'organisations.id AS org_id,',
    'organisations.name AS org_name',
    'FROM challenges',
    'JOIN organisations ON organisations.id = challenges.org_id',
    'JOIN locations_challenges ON locations_challenges.challenges_id = challenges.id',
    'JOIN people on challenges.creator_id = people.id',
    'WHERE locations_challenges.locations_id IN ' + convert(locationsIds),
    'AND challenges.active is not false'
  ]

  var allChallenges = [
    'SELECT',
    'challenges.id AS chal_id,',
    'challenges.title AS chal_title,',
    'challenges.description AS chal_description,',
    'challenges.date AS chal_date,',
    'challenges.creator_id AS creator_id,',
    'people.first_name AS creator_first_name,',
    'people.last_name AS creator_last_name,',
    'organisations.id AS org_id,',
    'organisations.name AS org_name',
    'FROM challenges',
    'JOIN organisations ON organisations.id = challenges.org_id',
    'JOIN people on challenges.creator_id = people.id',
    'WHERE challenges.active is not false'
  ]

  if(tagIds.length === 0 && locationsIds.length === 0) {
    return allChallenges.concat(['ORDER BY chal_date']).join(' ');
  }

  if(tagIds.length > 0 && locationsIds.length > 0) {
    return tagQuery.concat(['UNION'], locationQuery, ['ORDER BY chal_date']).join(' ')
  }

  if (tagIds.length > 0) {
    return tagQuery.concat(['ORDER BY chal_date']).join(' ');
  }

  if(locationsIds.length >0) {
    return locationQuery.concat(['ORDER BY chal_date']).join(' ');
  }
}

function convert(ids) {
   var res = '(';
   ids.forEach(function(id, i) {
     if (i < ids.length - 1) {
       res += id + ', ';
     } else {
       res += id;
     }
   });
   res += ')';
   return res;
}
