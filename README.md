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

A plugin which exposes the following functions on the request.pg.challengs object:
- creates a 'Challenges' table
- _add_ function to add challenge to pre-existing challenge table
- _getById_ function to get challenge, and associated tags,
from pre-existing challenge table, by specifying a challenge id.
- _getByTag_ function to get all challenges that contain a certain tag, if given false, returns all active challenges
