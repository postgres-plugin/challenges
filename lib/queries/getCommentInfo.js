'use strict';

module.exports = function (commentId) {
  return [
    'SELECT',
    'comments.id,',
    'comments.comment,',
    'comments.author_id,',
    'comments.author_flag,',
    'author.id AS author_id,',
    'author.user_type AS author_user_type,',
    'author.first_name AS author_first_name,',
    'author.last_name AS author_last_name,',
    'flagger.id AS flagger_id,',
    'flagger.user_type AS flagger_user_type,',
    'flagger.first_name AS flagger_first_name,',
    'flagger.last_name AS flagger_last_name,',
    'org_author.id AS author_org_id,',
    'org_author.name AS author_org_name,',
    'org_flagger.id AS flagger_org_id,',
    'org_flagger.name AS flagger_org_name,',
    'challenges.id AS challenge_id,',
    'challenges.title AS challenge_title',
    'FROM',
    'comments',
    'JOIN challenges on challenges.id = comments.challenge_id',
    'JOIN people author on author.id = comments.author_id',
    'JOIN people flagger on flagger.id = comments.author_flag',
    'LEFT OUTER JOIN organisations org_author on org_author.id = author.org_id',
    'LEFT OUTER JOIN organisations org_flagger on org_flagger.id = flagger.org_id',
    'WHERE comments.id = ' + commentId
  ].join(' ');
};
