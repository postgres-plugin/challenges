'use strict';

function byTagsLength (a, b) {
  return a.tags.length < b.tags.length;
}

module.exports = function (rows) {
  var orgs = rows.reduce(function (obj, row) {
    // if this is a new org
    if (!obj[row.org_id]) {
      obj[row.org_id] = {
        org_name: row.org_name,
        org_id: row.org_id,
        org_logo_url: row.org_logo_url,
        tags: [] };
    }
    // add the tag object to the relavant organisation
    obj[row.org_id].tags.push({ tag_name: row.tag_name, tag_id: row.tag_id });

    return obj;
  }, {});

  // map orgs into an array, then sort by number of
  // tags that they have in their tags array
  var orderedOrgs = Object.keys(orgs)
    .map(function (id) { return orgs[id] })
    .sort(byTagsLength);

  return orderedOrgs;
};
