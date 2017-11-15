'use strict';

/**
* Removes then adds locations to an item
* stored in a link table: locations_challenges table
**/

// addTags(0, [0, 3, 9])
// adds following pairs to the locations_challenges table:
// challenges_id | locations_id
// 0             | 0
// 0             | 3
// 0             | 9

function addLocations (itemId, locationIds) {
  var linkTableName = 'locations_challenges';
  var linkColumnName = 'challenges_id';
  var values;
  var deleteQuery = 'DELETE FROM ' + linkTableName + ' WHERE '
    + linkColumnName + ' = ' + itemId + ';';

  if (tagIds.length === 0) {
    return deleteQuery;
  }

  values = tagIds.map(function (tagId) {
    return '(' + tagId + ', ' + itemId + ')';
  }).join(',');

  return deleteQuery + 'INSERT INTO ' + linkTableName
    + ' (tags_id, ' + linkColumnName + ') VALUES ' + values + ';';
}

module.exports = addLocations;
