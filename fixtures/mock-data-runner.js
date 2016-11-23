'use strict';

var importMockData = require('./importMockData.js');
var config = require('../config/load-config.js');

importMockData(config, function (response) {
  console.log(response); //eslint-disable-line

  return response;
});
