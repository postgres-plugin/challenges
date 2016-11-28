'use strict';

module.exports = function (rows) {
  var tags;

  // if no challenge was found
  if (rows.length === 0) {
    return {};
  }


  tags = rows.map(function (obj) {
    return {
      id: obj.tags_id,
      name: obj.tags_name
    };
  });
  delete rows[0].tags_id;
  delete rows[0].tags_name;
  rows[0].tags = tags;

  return rows[0];

};
