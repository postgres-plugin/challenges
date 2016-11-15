'use strict';

module.exports = function (query, pool, cb) {
  pool.connect(function (poolErr, client, done) {
    var result;

    if (poolErr) {
      return cb(poolErr, null);
    }
    return client.query(query, function (queryErr, response) {
      if (queryErr) {
        return cb(queryErr, null);
      }
      result = response && response.rows;
      done();

      return cb(null, result);
    })
  });
}
