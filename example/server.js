'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var challenges = require('../lib/index.js');
var pg = require('pg');
var pgPeople = require('pg-people');
var tagsSystem = require('tags-system');

var tagsData = require('./data/tags.json');
var categoriesData = require('./data/categories.json');
var peopleData = require('./data/people.json');
var organisationsData = require('./data/organisations.json');
var tagsOrgsData = require('./data/tags_organisations.json');
var challengesData = require('./data/challenges.json');
var tagsChallengesData = require('./data/tags_challenges.json');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);
  var optionsTags = {
    reset: true,
    tags: tagsData,
    categories: categoriesData,
    pool: pool
  };
  var optionsPeople = {
    pool: pool,
    reset: true,
    people: peopleData,
    organisations: organisationsData,
    tags_organisations: tagsOrgsData
  };
  var optionsChallenges = {
    pool: pool,
    reset: true,
    challenges: challengesData,
    tags_challenges: tagsChallengesData
  };

  server.connection({ port: config.port });

  return server.register({
    register: tagsSystem,
    options: optionsTags
  }, function (errorTags) {
    if (errorTags) {
      console.log('tags', errorTags); // eslint-disable-line

      return callback(errorTags);
    }

    return server.register({
      register: pgPeople,
      options: optionsPeople
    }, function (errorPeople) {
      if (errorPeople) {
        console.log('people', errorPeople); // eslint-disable-line

        return callback(errorPeople);
      }

      return server.register({
        register: challenges,
        options: optionsChallenges
      }, function (challengesErr) {
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
                org_id: 1,
                creator_id: 1,
                active: false
              };

              request.server.methods.pg.challenges.add(obj, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'Add Challenge failed');
                reply(response);
              });
            }
          }, {
            method: 'GET',
            path: '/getById',
            handler: function (request, reply) {
              var challengeId = 2;

              request.server.methods.pg.challenges.getById(challengeId, function (error, response) { //eslint-disable-line
                Hoek.assert(!error, 'getById failed');
                reply(response);
              });
            }
          }, {
            method: 'GET',
            path: '/getByTag',
            handler: function (request, reply) {
              var tagId = request.query.tagId;

              request.server.methods.pg.challenges.getByTag(tagId, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'getByTag failed');
                reply(response);
              });
            }
          }, {
            method: 'GET',
            path: '/getAllActive',
            handler: function (request, reply) {
              request.server.methods.pg.challenges.getByTag(false, function (error, response) { // eslint-disable-line
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
