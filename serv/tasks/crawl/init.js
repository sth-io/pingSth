var Crawler = require("js-crawler");

var config = {
  relative: false,
  website: 'http://clearcode.cc',
  webNoProtocol: function(web) {
    web = web.substr(web.indexOf('://')+3, web.length);
    web = web;

    return web;
  },
  regex: {
    val: (/\/(\d{4})\//),
    excl: true
  }
}

var urls = [];
new Crawler().configure({
    ignoreRelative: false,
    depth: 4,
    shouldCrawl: function(url) {
      if(config.regex && url.indexOf('/'+config.webNoProtocol(config.website)) > -1 || url.indexOf(config.webNoProtocol(config.website)+'/') > -1) {
          return !config.regex.val.test(url);
      } else {
        return url.indexOf('/'+config.webNoProtocol(config.website)) > -1 || url.indexOf(config.webNoProtocol(config.website)+'/') > -1 ;
      }
    }
  })
  .crawl(config.website, function onSuccess(page) {

  }, null, function onAllFinished(crawledUrls) {
    console.log('All crawling finished');
    console.log(crawledUrls);
  });

function structurer(web) {
  this.params = {};
  this.params.regex = null;
  this.params.depth = 4;
  this.params.relative = false;
  this.init(web);
}

structurer.prototype = {
  init: function(web) {
    this.params = web;


  },
  crawler: function() {
    var self = this;
    new Crawler().configure({
        ignoreRelative: self.params.realtive,
        depth: self.params.depth,
        shouldCrawl: function(url) {
          if(self.params.regex !== null) {
            switch 
                return !config.regex.val.test(url);
          }
        }
      })
  }
}

// todo
// refacor into module
// duplicates
// save structures
