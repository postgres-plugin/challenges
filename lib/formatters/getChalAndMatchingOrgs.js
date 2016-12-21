var rows = [ {
    or_id: 4,
    org_name: 'emf',
    tag_name: 'automotive and transport manufacturing',
    ch_id: 4,
    title: 'challenge number 4',
    description: 'who should i...?',
    creator_id: 4,
    org_id: 2,
    active: true },
 {
    or_id: 4,
    org_name: 'emf',
    tag_name: 'design for disassembly',
    ch_id: 4,
    title: 'challenge number 4',
    description: 'who should i...?',
    creator_id: 4,
    org_id: 2,
    active: true },
 {
    or_id: 5,
    org_name: 'co-op group',
    tag_name: 'design for disassembly',
    ch_id: 4,
    title: 'challenge number 4',
    description: 'who should i...?',
    creator_id: 4,
    org_id: 2,
    active: true },
 {
    or_id: 6,
    org_name: 'asda',
    tag_name: 'automotive and transport manufacturing',
    ch_id: 4,
    title: 'challenge number 4',
    description: 'who should i...?',
    creator_id: 4,
    org_id: 2,
    active: true },
 {
    or_id: 6,
    org_name: 'asda',
    tag_name: 'design for disassembly',
    ch_id: 4,
    title: 'challenge number 4',
    description: 'who should i...?',
    creator_id: 4,
    org_id: 2,
    active: true },
 {
    or_id: 6,
    org_name: 'asda',
    tag_name: 'chemicals',
    ch_id: 4,
    title: 'challenge number 4',
    description: 'who should i...?',
    creator_id: 4,
    org_id: 2,
    active: true } ]

var challenge = {};
var orgs = {};

// function buildChallenge (obj) {
//   return {
//     id: obj.ch_id,
//     title: obj.title,
//     description: obj.description,
//     creator_id: obj.creator_id,
//     org_id: obj.org_id,
//     active: obj.active
//   }
// }


function byTagsLength (a, b) {
  return a.tags.length < b.tags.length
}


module.exports = function (rows) {
  var orgs = rows.reduce(function (obj, row) {
    //build challenge
    if (!challenge) {
      buildChallenge(row)
    }
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
}
