var webshot = require('webshot'),
    colors = require('colors');

function Screen(path) {
  console.log("STARTED SCREENGRAB");

  var filename = path.substr(path.indexOf("://")+3, path.length);
  webshot(path, 'app/screens/' + filename + '.png', {phantomConfig: {'ignore-ssl-errors': 'true'}}, function(err) {
    console.log('✔ SCREEN TAKEN FOR:'+filename.green);
  });
}

module.exports = Screen;
