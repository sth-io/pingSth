var Ping = require('./ping'),
  Website = require('../models/website'),
  cron = require('cron'),
  exec = require('child_process').exec;
  exec('node tasks/batchStatus/init.js', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});


  // var batchParse = cron.job('00 30 2 * * 0-6', function(){
  //     // perform operation e.g. GET request http.get() etc.
  //
  // });
  // batchParse.start();

function Init() {
  // todo: cache websites
  // reset pinging
  Website.update({}, {
    pinging: 0
  }, {
    multi: true
  }, function(err, data) {
    // updated
    console.log(data);

  });
  // start pinging.
  Website.find({}, function(err, websites) {
    for (var i = 0, len = websites.length; i < len; i++) {
      new Ping(websites[i]);
    }
  })
}

module.exports = Init;