const fs = require('fs');
const rnd  = Math.random().toString(36).substring(7);
return fs.readFile('./build/service-worker.js', 'utf8', (err, body) => {
  const newBody = body.replace(`["index.html",`,
    `["manifest.json", "${rnd}d2e59370060e5c8b2d78bf4994"],["index.html",`);
  fs.writeFile('./build/service-worker.js', newBody, function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
});

