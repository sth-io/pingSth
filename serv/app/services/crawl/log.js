var Structure = require('../../models/structure');

function loging(website, structure) {
  var logd = {
   structure: structure,
    website: website,
    timestamp: new Date()
  }
  var log = new Structure(logd);
  log.save(function(err, data) {
    console.log('Site structure added for: '+website)
  });
}

module.exports = loging;
