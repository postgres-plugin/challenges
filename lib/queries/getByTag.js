'use strict';

/*
* We pass getByTag a table that we want get ('challenges') and a tag id
* that we want to filter by. This function should return all of the challenges
* that meet that contain that tag.
*/

module.exports = function (tagId) {
  /* FIND ALL CHALLANGES BY TAG ID THEN GET ALL TAGS FOR THOSE CHALLANGES */
  return [
    'SELECT',
    'filter_id, filter_name, chal_id, chal_date, chal_title, chal_description,',
    'org_id, org_name',
    'FROM (',
      'SELECT',
      tagId + ' AS filter_id,',
      'tags.name AS filter_name',
      'FROM',
      'tags WHERE tags.id = ' + tagId,
    ') AS filter_details',
    'LEFT OUTER JOIN (',
      'SELECT',
        'tid, chal_id, chal_date, chal_title, chal_description,',
        'org_id, org_name',
        'FROM (',
        'SELECT',
        'tags_id AS tid,',
        'challenges_id AS chal_id',
        'FROM tags_challenges',
      ') AS challenge_ids',
      'INNER JOIN (',
        'SELECT',
        'id, org_id,',
        'date AS chal_date,',
        'title AS chal_title,',
        'description AS chal_description',
        'FROM challenges',
        'WHERE challenges.active is not false',
      ') AS challenge_details',
      'on challenge_details.id = chal_id',
      'INNER JOIN (',
        'SELECT',
        'id, name AS org_name',
        'FROM organisations',
        'WHERE organisations.active is not false',
      ') AS org_details',
      'on org_details.id = org_id',
    ') AS challenges_all',
    'on challenges_all.tid = filter_details.filter_id',
    'ORDER BY chal_date DESC,',
    'chal_title ASC;'
  ].join(' ');
};

/*
SELECT
filter_id, filter_name, chal_id, chal_date, chal_title, chal_description,
org_id, org_name
FROM (
  SELECT
  9 AS filter_id,
  tags.name AS filter_name
  FROM
  tags WHERE tags.id = 9
) AS filter_details
LEFT OUTER JOIN (
  SELECT
    tid, chal_id, chal_date, chal_title, chal_description, org_id, org_name
    FROM (
    SELECT
    tags_id AS tid,
    challenges_id AS chal_id
    FROM tags_challenges
  ) AS challenge_ids
  INNER JOIN (
    SELECT
    id, org_id,
    date AS chal_date,
    title AS chal_title,
    description AS chal_description
    FROM challenges
    WHERE challenges.active is not false
  ) AS challenge_details
  on challenge_details.id = chal_id
  INNER JOIN (
    SELECT
    id, name AS org_name
    FROM organisations
    WHERE organisations.active is not false
  ) AS org_details
  on org_details.id = org_id
) AS challenges_all
on challenges_all.tid = filter_details.filter_id
ORDER BY chal_date DESC,
chal_title ASC;
*/
