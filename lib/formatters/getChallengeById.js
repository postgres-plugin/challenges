'use strict';

module.exports = function (data) {
  var tags;

  if (data.length > 0) {
    tags = data.map(function (obj) {
      return {
        id: obj.tags_id,
        name: obj.tags_name
      };
    });
    delete data[0].tags_id;
    delete data[0].tags_name;
    data[0].tags = tags;

    return data[0];
  }

  return data;
};
