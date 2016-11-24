'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var challenges = require('../lib/index.js');
var pg = require('pg');
var pgPeople = require('pg-people');
var tagsSystem = require('tags-system');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);
  var optionsTags = {
    tags: require('../fixtures/mockdata/tags.json'),
    categories: require('../fixtures/mockdata/categories.json'),
    pool: pool
  };
  var optionsPeople = {
    pool: pool,
    reset: true,
    people: require('../fixtures/mockdata/people.js'),
    organisations: require('../fixtures/mockdata/organisations.json'),
    tags_organisations: require('../fixtures/mockdata/tags_organisations.json')
  }
  var optionsChallenges = {
    pool: pool,
    reset: true,
    challenges: require('../fixtures/mockdata/challenges.json'),
    tags_challenges: require('../fixtures/mockdata/tags_challenges.json')
  }

  server.connection({ port: config.port });

  return server.register({
    register: tagsSystem,
    options: optionsTags
  }, function (errorTags) {
    if (errorTags) {
      console.log('tags', errorTags);
      return callback(errorTags);
    }
    server.register({
      register: pgPeople,
      options: optionsPeople
    }, function (errorPeople) {
      if (errorPeople) {
        console.log('people', errorPeople);
        return callback(errorPeople);
      }
      server.register({
      register: challenges,
      options: optionsChallenges
    }, function (challengesErr) {
      console.log('chalsError', challengesErr);
        if (challengesErr) {
          return callback(challengesErr);
        }

        server.route([
          {
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
              var obj = {
                title: 'Tea',
                description: 'With milk',
                date: '1479491066104',
                org_id: 1,
                creator_id: 1,
                active: false
              };

              request.addChallenge(obj, function (error, response) {
                Hoek.assert(!error, 'Add Challenge failed');
                reply(response);
              });
            }
          }, {
            method: 'GET',
            path: '/getChallenge',
            handler: function (request, reply) {
              var challengeId = 2;

              request.getChallenge(challengeId, function (error, response) {
                Hoek.assert(!error, 'Get Challenge failed');
                reply(response);
              });
            }
          }, {
            method: 'GET',
            path: '/getChallengesByTag',
            handler: function (request, reply) {
              var tagId = request.query.tagId;

              request.getChallengesByTag(tagId, function (error, response) {
                Hoek.assert(!error, 'getChallengesByTag failed');
                reply(response);
              });
            }
          }, {
            method: 'GET',
            path: '/getAllActive',
            handler: function (request, reply) {
              request.getChallengesByTag(false, function (error, response) {
                Hoek.assert(!error, 'getAllActive failed');
                reply(response);
              });
            }
          }
        ]);

        return server.start(function (errorStart) {
          return callback(errorStart, server, pool);
        });
      });
    });
  });
}

module.exports = init;
