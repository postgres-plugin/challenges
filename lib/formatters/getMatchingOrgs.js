'use strict';

function byTagsLength (a, b) {
  return a.tags.length < b.tags.length;
}

module.exports = function (rows) {
  var orgs = rows.reduce(function (obj, row) {
    // if this is a new org
    if (!obj[row.or_id]) {
      obj[row.or_id] = { name: row.org_name, id: row.or_id, tags: [] };
    }
    // add the tag object to the relavant organisation
    obj[row.or_id].tags.push({ tag_name: row.tag_name, tag_id: row.tag_id });

    return obj;
  }, {});

  // map orgs into an array, then sort by number of
  // tags that they have in their tags array
  var orderedOrgs = Object.keys(orgs)
    .map(function (id) { return orgs[id] })
    .sort(byTagsLength);

  return orderedOrgs;
};
