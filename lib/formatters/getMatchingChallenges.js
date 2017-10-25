function convert(challenges) {
  var seen = {};
  var data;
  return challenges.filter(function(chal) {
      var previous;

      if (seen.hasOwnProperty(chal.id)) {
          previous = seen[chal.id];
          previous.tags.push(chal.tag_id);

          return false;
      }

      if (!Array.isArray(chal.tag_id)) {
          chal.tags = [chal.tag_id];
      }

      seen[chal.id] = chal;

      return true;
  });
}

module.exports = function (rows) {
  var data = convert(rows);
  var challenges = data.map(function(d) {
    return {
      id: d.id,
      title: d.title,
      matches: d.tags.length
    }
  });

  return challenges.sort(function(c1, c2) {
    return c2.matches - c1.matches;
  });
};
