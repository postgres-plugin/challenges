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

A plugin which:
- creates a 'Challenges' table
- _addChallenge_ function to add challenge to pre-existing challenge table
- _getChallenge_ function to get challenge to pre-existing challenge table
