  var cron = require('cron'),
      exec = require('child_process').exec,
      Deps = require('./dependencies'),
      Plugins = require(GLOBAL.conf.srvcPath+'plugins');
    //   Website = require(Deps.Model.Website);

  exec('node tasks/batchStatus/init.js', function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
          console.log('exec error: ' + error);
      }
  });


  function Init() {
      // todo: cache websites
      // reset pinging
      Deps.Model.Website.update({}, {
          pinging: 0
      }, {
          multi: true
      }, function(err, data) {
          // updated
          console.log(data);

      });
  }

  module.exports = Init;
