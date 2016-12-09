'use strict';

module.exports = function (chal) {
  var tags = [];

  // if no challenge was found
  if (chal.length === 0) {
    return {};
  }

  if (chal[0].tags_id) {
    tags = chal.map(function (obj) {
      return {
        id: obj.tags_id,
        name: obj.tags_name
      };
    });
  }

  delete chal[0].tags_id;
  delete chal[0].tags_name;
  chal[0].tags = tags;

  return chal[0];
};
