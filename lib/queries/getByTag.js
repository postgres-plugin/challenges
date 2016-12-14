'use strict';

/*
* We pass getByTag a table that we want get ('challenges') and a tag id
* that we want to filter by. This function should return all of the challenges
* that meet that contain that tag.
*/

module.exports = function (tagId) {
  /* FIND ALL CHALLANGES BY TAG ID THEN GET ALL TAGS FOR THOSE CHALLANGES */
  return 'SELECT '
  + 'tags_challenges.tags_id as tid, '
  + 'tags.name AS tags_name, '
  + 'challenges.id AS chal_id, '
  + 'challenges.date AS chal_date, '
  + 'challenges.title AS chal_title, '
  + 'challenges.description AS chal_description, '
  + 'organisations.name AS org_name, '
  + 'organisations.id AS org_id, '
  + tagId + ' AS filter_id, '
  // FOLLOWING LINE ADDS THE TAG THAT WE ARE FILTERING BY TO CERTAIN ROWS
  + '(SELECT tags.name WHERE tags.id = ' + tagId + ') AS filter_name '
  + 'FROM tags_challenges '
  + 'JOIN '
  + 'challenges '
  + 'ON '
  + 'tags_challenges.challenges_id = challenges.id '
  + 'RIGHT OUTER JOIN '
  + 'tags '
  + 'ON '
  + 'tags_challenges.tags_id = tags.id '
  + 'LEFT OUTER JOIN '
  + 'organisations '
  + 'ON '
  + 'challenges.org_id = organisations.id '
  + 'WHERE tags_challenges.challenges_id '
  + 'IN ( '
  // PERFORM THIS QUERY FIRST
  // RETURNS A TABLE WITH ONE COLUMN CONTAINING ALL CHALLENGE IDS THAT HAVE
  // THE GIVEN TAG ASSOCIATED
  + '  SELECT '
  + '  challenges_id as chal_id '
  + '  FROM '
  + '  tags_challenges '
  + '  WHERE '
  + '  tags_challenges.tags_id = ' + tagId + ' '
  + ') '
  + 'OR tags.id = ' + tagId + ' '
  + 'AND tags.active IS NOT FALSE '
  + 'AND challenges.active IS NOT FALSE '
  + 'AND organisations.active IS NOT FALSE '
  + 'ORDER BY challenges.date DESC, '
  + 'challenges.title ASC;';
};

/*
SELECT
tags_challenges.tags_id as tid,
tags.name AS tags_name,
challenges.id AS chal_id,
challenges.date AS chal_date,
challenges.title AS chal_title,
challenges.description AS chal_description,
organisations.name AS org_name,
organisations.id AS org_id,
(SELECT tags.name WHERE tags.id = 68) AS filter_tag
FROM tags_challenges
JOIN
challenges
ON
tags_challenges.challenges_id = challenges.id
JOIN
tags
ON
tags_challenges.tags_id = tags.id
JOIN
organisations
ON
challenges.org_id = organisations.id
WHERE tags_challenges.challenges_id
IN (
  SELECT
  challenges_id as chal_id
  FROM
  tags_challenges
  WHERE
  tags_challenges.tags_id = 68
)
AND tags.active = TRUE
AND challenges.active = TRUE
AND organisations.active = TRUE
ORDER BY challenges.date DESC,
challenges.title ASC;

*/
