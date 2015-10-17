var statusCodes = require('http').STATUS_CODES,
  request = require('request'),
  Log = require('./log'),
  Website = require('../models/website'),
  Screenshot = require('./screenshot'),
  colors = require('colors');

function Ping(opts) {
  this.website = '';
  this.timeout = 15;
  this.handle = null;
  console.log("---------------".yellow);
  console.log("Started pinging".green);
  console.log(opts);
  console.log("---------------".yellow);
  this.init(opts);
}

Ping.prototype = {
  init: function(opts) {
    var self = this;


    self.website = opts.website;
    self.timeout = (opts.timeout * 60000);
    new Screenshot(self.website);
    Website.findOne({
      website: self.website
    }, function(err, web) {
      if (web.pinging !== 1) {
        Website.update({
          website: self.website
        }, {
          pinging: 1
        }, function(err, data) {
          // updated, now start
          self.start();
        });
      }
    });
  },

  start: function() {
    var self = this,
      time = Date.now();
    // create an interval for pings
    self.handle = setInterval(function() {
      Website.findOne({
        website: self.website
      }, function(err, web) {
        if (web) {
          self.ping();
        }
      });
    }, self.timeout);
  },

  ping: function() {
    var self = this,
      ct = Date.now();
    try {
      // send request
      request(self.website, function(error, res, body) {
        // Website is up
        if (!error && res.statusCode === 200) {
          self.isOk(ct);
        }
        // No error but website not ok
        else if (!error) {
          self.isNotOk(res.statusCode);
        }
        // Loading error
        else {
          self.isNotOk();
        }
      });
    } catch (err) {
      self.isNotOk();
    }
  },
  isOk: function(ct) {
    this.log(1, 'OK', ct);
  },
  isNotOk: function(statusCode) {
    var time = Date.now(),
      self = this
    msg = statusCodes[statusCode + ''],
      htmlMsg = '<p>Time: ' + time;
    htmlMsg += '</p><p>Website: ' + self.website;
    htmlMsg += '</p><p>Message: ' + msg + '</p>';
    this.log(0, msg);

  },
  log: function(status, msg, ct) {
    var self = this,
      time = Date.now(),
      output = '';
    output += "\nWebsite: " + self.website;
    output += "\nTime: " + time;
    output += "\nStatus: " + status;
    output += "\nMessage:" + msg + "\n";
    if (status == 1) {
      console.log(output.green);
    } else {
      console.log(output.red);
    }
    var log = {};
    log.website = self.website;
    log.status = status;
    if(ct) {
      log.response = time - ct;
    }
    console.log(log.response);
    new Log(log)
  }
}


module.exports = Ping;
