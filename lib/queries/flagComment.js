'use strict';

module.exports = function (payload) {
  console.log(payload);
  return [
    'UPDATE',
    'comments',
    'SET',
    'flagged = true,',
    'author_flag = ' + payload.author_flag + ',',
    'updated_at = default',
    'WHERE',
    'id = ' + payload.id,
    ';'
  ].join(' ');
};
