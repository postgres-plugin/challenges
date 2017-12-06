'use strict';

module.exports = function (userId) {
  return 'SELECT id, title, description, org_id, creator_id'
  + ' FROM challenges WHERE creator_id = ' + userId
  + ' AND active = FALSE ORDER BY date desc;';
};
