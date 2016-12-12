'use strict';

module.exports = function (id) {
  return 'UPDATE challenges'
    + ' SET active = NOT challenges.active WHERE '
    + 'id = ' + id + ';';
};
