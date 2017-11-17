'use strict';

module.exports = function (tagIds, locationsIds) {
  var tagQuery = [
    'SELECT',
    'challenges.id AS chal_id,',
    'challenges.title AS chal_title,',
    'challenges.description AS chal_description,',
    'challenges.date AS chal_date,',
    'organisations.id AS org_id,',
    'organisations.name AS org_name',
    'FROM challenges',
    'JOIN organisations ON organisations.id = challenges.org_id',
    'JOIN tags_challenges ON tags_challenges.challenges_id = challenges.id',
    'WHERE tags_challenges.tags_id IN ' + convert(tagIds)
  ]

  var locationQuery = [
    'SELECT',
    'challenges.id AS chal_id,',
    'challenges.title AS chal_title,',
    'challenges.description AS chal_description,',
    'challenges.date AS chal_date,',
    'organisations.id AS org_id,',
    'organisations.name AS org_name',
    'FROM challenges',
    'JOIN organisations ON organisations.id = challenges.org_id',
    'JOIN locations_challenges ON locations_challenges.challenges_id = challenges.id',
    'WHERE locations_challenges.locations_id IN ' + convert(locationsIds),
    'ORDER BY chal_date'
  ]

  return tagQuery.concat(['UNION'], locationQuery).join(' ');
};

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
