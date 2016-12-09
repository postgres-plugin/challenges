# Challenges
[![Build Status](https://travis-ci.org/postgres-plugin/challenges.svg?branch=master)](https://travis-ci.org/postgres-plugin/challenges)
[![codecov](https://codecov.io/gh/postgres-plugin/challenges/branch/master/graph/badge.svg)](https://codecov.io/gh/postgres-plugin/challenges)

Pre-requisites:
- Create a challenges_test and challenges database:
  ```
  CREATE DATABASE challenges;
  CREATE DATABASE challenges_test
  ```

- Initialise tables and populate your database by running
  ```
  npm run db
  ```

- creates a 'Challenges' table

A plugin which exposes the following functions on the request.server.methods.pg.challengs object:

### _add(challengeObject, cb)_
function to add challenge to pre-existing challenge table
challengeObject:
```js
{
  title: 'Tea',
  description: 'With milk',
  org_id: 1,
  creator_id: 1,
  active: true
}
```

Returns `[{ id: x }]` if challenge was successfully added, where x is assigned by postgres.
Returns an error if unsuccessful.


### _getById(id, cb)_
function to get a specific challenge, and associated tags,
id: Integer

returns:
```js
{
  id: 2,
  title: 'Challenge Number 2',
  description: 'How can I...?',
  org_id: 1,
  org_name: 'Apple'
  creator_id: 3,
  tags: [ { id: 2, name: 'Corporate' } ] || [] // if no tags
}
```
or an empty object `{}` if no challenge was found.

### _getByTag(id, cb)_
function to get all challenges that contain a certain tag
id: Integer if we want to filter by a tag id
or `false` if we do not want to filter

If a tag id is given, returns:
```js
{ filter_tag: 'Design for disassembly',
  challenges:
   [ { id: 4,
       date: '2016-12-07 15:36:24.636112+00',
       title: 'Challenge Number 4',
       description: 'Who should I...?',
       org_id: 2,
       shared_by: 'dwyl',
       tags:
        [
          { tag_id: 9, tag_name: 'Automotive and Transport Manufacturing' },
          { tag_id: 11, tag_name: 'Chemicals' },
          { tag_id: 60, tag_name: 'Secondary education' }
        ]
      },
     { id: 7,
       date: '2016-12-07 15:36:24.636112+00',
       title: 'Challenge Number 7',
       description: 'Is it possible to...?',
       org_id: 4,
       shared_by: 'EMF',
       tags: null // if no tags have been attached to the challenge
     },
      ...
    ]
}
```
If `false` is given, returns the same shape, but with
```js
filter_tag: undefined
```

### _checkEditable(userId, chalId, cb)_
returns Boolean
If user and belongs to the org that created the challenge, return true; otherwise false.
