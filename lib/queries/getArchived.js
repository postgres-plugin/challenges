'use strict';

module.exports = function (orgId) {
  return 'SELECT id, title, description, org_id, creator_id'
  + ' FROM challenges WHERE org_id = '
  + orgId + ' AND active = FALSE ORDER BY date desc;';
};
