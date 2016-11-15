'use strict';

module.exports = function (id) {
  return 'SELECT * FROM challenges WHERE id = ' + id;
};
