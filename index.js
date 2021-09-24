const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var fs = require('fs')
var assetlink = 'Test'
var appleApplink = 'Apple Test'


function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

readJSONFile('.well-known/assetlinks.json', function (err, json) {
  if(err) { throw err; }
  assetlink = json;
});

readJSONFile('.well-known/apple-app-site-association', function (err, json) {
  if(err) { throw err; }
  appleApplink = json;
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/.well-known/assetlinks.json', (req, res) => {
	  res.send(assetlink);
  })
  .get('/.well-known/apple-app-site-association', (req, res) => {
	  res.send(appleApplink);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))