'use strict';

module.exports = function (id) {
  return 'SELECT id, title, description, date, org_id, creator_id, active '
    + 'FROM challenges WHERE id = ' + id;
};
