const fs = require('fs');
const handler = require('webplayer/lib/server/handler').default;

module.exports = (event = {}, context, callback) => {
  const { path } = event;

  if (path === '/index.html') {
    console.log(path);
    return handler('/')
      .then(body => {
        callback(null, {
          statusCode: 200,
          body,
          headers: {
            'Content-Type': 'text/html',
          },
        });
      })
      .catch(callback);
  }
  if (path === '/manifest.json') {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(require('webplayer/build/manifest.json')),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  if (path === '/service-worker.js') {
    return fs.readFile('./node_modules/webplayer/build/service-worker.js', 'utf8', (err, body) => {
      callback(null, {
        statusCode: 200,
        body,
        headers: {
          'Content-Type': 'application/javascript',
        },
      });
    });
  }
  handler(path)
    .then(body => {
      callback(null, {
        statusCode: 200,
        body,
        headers: {
          'Content-Type': 'text/html',
        },
      });
    })
    .catch(callback);
};
