'use strict';


/* eslint-disable */
/*
tid |               tags_name                | chal_id |   chal_date   |     chal_title     |   chal_description    | org_name | org_id | ?column? |       filter_tag
-----+----------------------------------------+---------+---------------+--------------------+-----------------------+----------+--------+----------+------------------------
  8 | Automotive and Transport Manufacturing |       3 | 1479491066104 | Challenge Number 4 | Who should I...?      | dwyl     |      1 | hello    |
 10 | Chemicals                              |       3 | 1479491066104 | Challenge Number 4 | Who should I...?      | dwyl     |      1 | hello    |
 59 | Secondary education                    |       3 | 1479491066104 | Challenge Number 4 | Who should I...?      | dwyl     |      1 | hello    |
 68 | Design for disassembly                 |       3 | 1479491066104 | Challenge Number 4 | Who should I...?      | dwyl     |      1 | hello    | Design for disassembly
 68 | Design for disassembly                 |       6 | 1479491066104 | Challenge Number 7 | Is it possible to...? | EMF      |      3 | hello    | Design for disassembly

ROWS ARE PASSED IN THE FOLLOWING
  { tid: 8,
  tags_name: 'Automotive and Transport Manufacturing',
  chal_id: 3,
  chal_date: '1479491066104',
  chal_title: 'Challenge Number 4',
  chal_description: 'Who should I...?',
  org_name: 'dwyl',
  org_id: 1,
  filter_tag: null
  },
  { tid: 10,
  tags_name: 'Chemicals',
  chal_id: 3,
  chal_date: '1479491066104',
  chal_title: 'Challenge Number 4',
  chal_description: 'Who should I...?',
  org_name: 'dwyl',
  org_id: 1,
  filter_tag: null
}

INTO:
  [{
  id: 33,
  date: 98786865,
  title: 'Challenge Number 4',
  description: 'Who should I...?',
  org_id: 5,
  shared_by: 'EMF',
  tags: [
    {
    tag_id: 3,
    tag_name: 'Chemicals'
    }
  }, {
  ...
  }]
*/

/* eslint-enable */

function tagFromRow (row) {
  return {
    tag_id: row.tid,
    tag_name: row.tags_name
  };
}

// helper function that takes a row and returns a challenge object
function challengeFromRow (row) {
  return {
    id: row.chal_id,
    date: row.chal_date,
    title: row.chal_title,
    description: row.chal_description,
    org_id: row.org_id,
    shared_by: row.org_name,
    tags: [tagFromRow(row)]
  };
}

module.exports = function getChallengeByTag (rows) {
  // We want to preserve the order that postgres returns
  // we will use the order array to store each unique challenge id they appear
  var order = [];
  // define the name of the tag that we filter by
  var filter_tag;
  var challengesObject = rows.reduce(function (obj, row) {
    var chal_id = row.chal_id;

    // if this is a unique challenge id
    if (!obj[chal_id]) {
      // add the id to the order array
      order.push(chal_id);

      // the filter_tag column only has a string in it for certain rows
      // NULL everywhere else. So if we find a value in this column
      // it will store the filter_tag
      if (row.filter_tag) {
        filter_tag = row.filter_tag;
      }

      obj[chal_id] = challengeFromRow(row);
    } else {
      // if
      obj[chal_id].tags.push(tagFromRow(row));
    }

    return obj;
  }, {});

  // map through our array of ordered id's
  var challenges = order.map(function (id) {
    return challengesObject[id];
  });

  return { filter_tag: filter_tag, challenges: challenges };
};
