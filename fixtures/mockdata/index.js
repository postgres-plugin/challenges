'use strict';

var organisations = require('./organisations.json');
var tagsOrganisations = require('./tags_organisations.json');
var people = require('./people.js');
var challenges = require('./challenges.json');
var tagsChallenges = require('./tags_challenges.json');
var fields = require('./fields.json');

module.exports = {
  organisations: organisations,
  tagsOrganisations: tagsOrganisations,
  challenges: challenges,
  tagsChallenges: tagsChallenges,
  people: people,
  fields: fields
};
