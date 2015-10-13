var Ping  = require('./ping'),
    Website = require('../models/website');


function Init() {
  // todo: cache websites
  // reset pinging
  Website.update({},{ pinging: 0 },{multi: true}, function(err, data) {
    // updated
    console.log(data);

  });
  // start pinging.
  Website.find({}, function(err, websites){
    for (var i = 0, len = websites.length; i < len; i++) {
      new Ping(websites[i]);
    }
  })
}

module.exports = Init;
