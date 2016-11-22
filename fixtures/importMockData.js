'use strict';

var Hoek = require('hoek');
var pg = require('pg');
var query = require('pg-helpers').query;
var index = require('./mockdata/index.js');

// remove once challenges plugin has been registered
var fs = require('fs');
var path = require('path');
var file = path.resolve(__dirname, './initialise_tables.sql');
var initialisTables = fs.readFileSync(file, 'utf8').toString();

function importOrgs () {
  return index.organisations.map(function (organisation) {
    var values = index.fields.organisation.map(function (field) {
      return '\'' + organisation[field] + '\'';
    }).join(', ');

    return 'INSERT INTO organisations ('
      + index.fields.organisation.join(', ')
      + ') VALUES (' + values + '); ';
  }).join('');
}

function importTagsOrganisations () {
  return index.tagsOrganisations.map(function (tagsOrganisations) {
    var values = index.fields.tagsOrganisations.map(function (field) {
      return '\'' + tagsOrganisations[field] + '\'';
    }).join(', ');

    return 'INSERT INTO tags_organisations ('
      + index.fields.tagsOrganisations.join(', ')
      + ') VALUES (' + values + '); ';
  }).join('');
}

function importPeople () {
  return index.people.map(function (person) {
    var fields = [];
    var values = index.fields.person.map(function (field) {
      if (person[field] !== null) {
        fields.push(field);

        return '\'' + person[field] + '\'';
      }

      return null;
    }).filter(function (val) {
      return val !== null;
    });

    return 'INSERT INTO people ('
      + fields.join(', ')
      + ') VALUES (' + values + '); ';
  }).join('');
}

function importChallenges () {
  return index.challenges.map(function (challenge) {
    var values = index.fields.challenge.map(function (field) {
      return '\'' + challenge[field] + '\'';
    }).join(', ');

    return 'INSERT INTO challenges ('
      + index.fields.challenge.join(', ')
      + ') VALUES (' + values + '); ';
  }).join('');
}

function importTagsChallenges () {
  return index.tagsChallenges.map(function (tagsChallenges) {
    var values = index.fields.tagsChallenges.map(function (field) {
      return '\'' + tagsChallenges[field] + '\'';
    }).join(', ');

    return 'INSERT INTO tags_challenges ('
      + index.fields.tagsChallenges.join(', ')
      + ') VALUES (' + values + '); ';
  }).join('');
}

module.exports = function importMockData (config, cb) {
  var pool = new pg.Pool(config.pg);

  query(initialisTables, pool, function (initErr) {
    Hoek.assert(!initErr, initErr);
    query(importOrgs(), pool, function (orgErr) {
      Hoek.assert(!orgErr, orgErr);
      query(importTagsOrganisations(), pool, function (tagOrgErr) {
        Hoek.assert(!tagOrgErr, tagOrgErr);
        query(importPeople(), pool, function (peopleErr) {
          Hoek.assert(!peopleErr, peopleErr);
          query(importChallenges(), pool, function (chalErr) {
            Hoek.assert(!chalErr, chalErr);
            query(importTagsChallenges(), pool, function (tagChalErr) {
              Hoek.assert(!tagChalErr, tagChalErr);
              cb('mockdata added to pg');
            });
          });
        });
      });
    });
  });
}
