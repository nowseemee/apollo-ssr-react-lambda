'use strict';
const index = require('./index');

module.exports.index = (event, context, callback) => {
  // callback(null, {
  //   statusCode: 200,
  //   body: JSON.stringify(event),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  return index(event, context, callback);
};
