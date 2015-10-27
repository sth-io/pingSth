#!javascript


var crawler = require('./init');

  var web = {
      relative: false,
      website: 'http://clearcode.cc',
      depth: 2,
      regex: {
        val: (/\/(\d{4})\//),
        excl: true
      }
    }
    var cw = new crawler(web)
