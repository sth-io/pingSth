var webshot = require('webshot');

function Screen(path) {
  console.log("STARTED SCREENGRAB");
  var filename = path.substr(path.indexOf("://")+3, path.length);
  webshot(path, 'app/screens/' + filename + '.png', function(err) {
    console.log("SCREEN TAKEN FOR:"+filename);
  });
}

module.exports = Screen;
