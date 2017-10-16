'use strict';

module.exports = function (id) {
  return 'UPDATE comments'
    + ' SET active = NOT comments.active WHERE '
    + 'id = ' + id + ';';
};
