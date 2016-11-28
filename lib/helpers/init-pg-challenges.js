'use strict';

module.exports = function (request) {
  if (request.pg) {
    request.pg.challenges = {};
  } else {
    request.pg = { challenges: {} };
  }

  return request;
};
