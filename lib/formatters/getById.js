'use strict';

/* eslint-disable */
/*
getById takes an argument 'chal'.
The array has the following format:
[
  {
    id: 3,
    title: 'Challenge Number 3',
    description: 'Where can I...?',
    active: true,
    creator_id: 3,
    org_id: 1,
    org_name: 'Apple',
    tags_id: 105,
    tags_name: 'Buildings design'
  }, {
    id: 3,
    title: 'Challenge Number 3',
    description: 'Where can I...?',
    active: true,
    creator_id: 3,
    org_id: 1,
    org_name: 'Apple',
    tags_id: 85,
    tags_name: 'Fertiliser'
  }, ...
]
This is an array where the length is equal to the **number of tags** linked to the challenge.
*/
/* eslint-enable */

module.exports = function (chal) {
  var tags = [];
  var locations = [];

  // if no challenge was found
  if (chal.length === 0) {
    return [];
  }

  if (chal[0].tags_id) {
    tags = chal.map(function (obj) {
      return {
        id: obj.tags_id
      };
    }).reduce(function(unique, tag) {
      return unique.findIndex(e => e.id === tag.id) === -1 ? unique.concat(tag) : unique;
    }, []);
  }

  if (chal[0].locations_id) {
    locations = chal.map(function (obj) {
      return {
        id: obj.locations_id
      };
    }).reduce(function(unique, tag) {
      return unique.findIndex(e => e.id === tag.id) === -1 ? unique.concat(tag) : unique;
    }, []);
  }

  return [{
    id: chal[0].id,
    title: chal[0].title,
    description: chal[0].description,
    active: chal[0].active,
    creator_id: chal[0].creator_id,
    creator_first_name: chal[0].creator_first_name,
    creator_last_name: chal[0].creator_last_name,
    creator_active: chal[0].creator_active,
    org_id: chal[0].org_id,
    org_name: chal[0].org_name,
    tags: tags,
    locations: locations
  }];
};
