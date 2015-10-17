var mongoose = require('mongoose'),
  conf = require('../../config'),
  Stats = require('../../app/models/status'),
  BatchStat = require('../../app/models/batchStat'),
  Websites = require('../../app/models/website');

// connect to database
mongoose.connect(conf.dbUrl);


function batchStatus(opts) {
  console.log('BatchStatus: initialised.');
  this.websites = [];
  this.stamp = opts.stamp;

  this.today = new Date();
  this.gather();
}

batchStatus.prototype = {
  gather: function() {
    var self = this;
    Websites.find({}, function(err, data) {
      self.websites = data;
      self.iterator();
    });
    console.log('BatchStatus: Websites Gathered.');

  },
  iterator: function() {
    var self = this;
    for (var i = 0, len = self.websites.length; i < len; i++) {
      self.getData(self.websites[i])
    }
  },
  getData: function(ele) {
    var self = this,
      d = self.today;
    Stats.find({
      website: ele.website,
      timestamp: {
        "$gte": new Date(d.getFullYear(), d.getMonth(), d.getDate()),
        "$lt": new Date(d.getFullYear(), d.getMonth(), d.getDate() + self.stamp)
      }
    }, function(err, data) {
      new ParseStatus(data, ele);
    })
    // console.log('BatchStatus: Website data prepared for parse.');

  }
}

function ParseStatus(data, website) {
  // console.log('BatchStatus: started parsing.');
  var datatree = {
        up: 0,
        down: 0,
        total: 0,
        website: website.website,
        timestamp: new Date()
      }
  for (var i = 0, len = data.length; i < len; i++) {
      datatree.total++;
      switch (data[i].status) {
        case true:
          datatree.up++;
          break;
        case false:
          datatree.down++;
          break;
      }
  }

  var dt = new BatchStat(datatree);
  dt.save(function(err, data) {
      if(!website.up) {
        website.up = 0;
        website.down = 0;
        website.total = 0;
      }
      var total = {
        up: website.up + datatree.up,
        down: website.down + datatree.down,
        total: website.total + datatree.total,
        edit: new Date()
      }
      var edit = new Date(website.edit);
      if(edit.getFullYear() == total.edit.getFullYear() && edit.getMonth() == total.edit.getMonth() && edit.getDate() == total.edit.getDate() ) {
        console.log('already collected')
      } else {
        Websites.update({website: website.website}, total, function(err, data) {
          console.log(data)
        })
      }

  })

}


new batchStatus({
  stamp: 1
});
//
