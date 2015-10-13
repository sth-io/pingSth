var Status = require('../models/status'),
    Email = require('./email');

function Log(data) {
  this.log(data)
};

Log.prototype = {
  log: function(data) {
    data.timestamp = new Date();
    var status = new Status(data)
    if (data.status == 0) {
      Status.findOne({website: data.webstie}, function(err, last) {
        // if its first error
        if(last && last.status == 1) {
          console.log('mail went')
          Email('error', data);
        }

      })
    }
    status.save(function(err, data) {

    })
  }
}

module.exports = Log;
