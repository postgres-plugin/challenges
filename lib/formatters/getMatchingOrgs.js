function convert(organisations) {
  var seen = {};
  var data;
  return organisations.filter(function(org) {
      var previous;

      if (seen.hasOwnProperty(org.org_id)) {
          previous = seen[org.org_id];
          previous.tags.push(org.tag_id);

          return false;
      }

      if (!Array.isArray(org.tag_id)) {
          org.tags = [org.tag_id];
      }

      seen[org.org_id] = org;

      return true;
  });
}

module.exports = function (rows) {
  var data = convert(rows);
  var organisations = data.map(function(d) {
    return {
      org_id: d.org_id,
      org_name: d.org_name,
      org_logo_url: d.org_logo_url,
      matches: d.tags.length
    }
  });

  return organisations.sort(function(o1, o2) {
    return o2.matches - o1.matches;
  });
};
