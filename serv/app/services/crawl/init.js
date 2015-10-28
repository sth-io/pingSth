var Crawler = require("js-crawler"),
  pathExcl = require('./pathExcluder'),
  logger = require('./log'),
  SiteMap = require('../../models/sitemap'),
  Website = require('../../models/website'),
  ObjectId = require('mongoose').Types.ObjectId;

function structurer(web) {
  this.params = {};
  this.params.regex = null;
  this.params.depth = 1;
  this.params.relative = false;
  this.sitemap = false;
  this.init(web);
  this.handle = '';

}


structurer.prototype = {
  init: function(web) {
    if (web.depth > 5) {
      web.depth = 5;
    }
    var self = this;
    self.params = web;
    Website.findOne({
      _id: new ObjectId(web._id)
    }, function(err, webs) {
      var timeout;
      if (webs.structurer == 0 || Object.prototype.toString.call(webs.structurer) !== '[object Number]') {
        timeout = 1;
        webs.structurer = false;
      } else {
        timeout = webs.structurer;
      }
      self.handle = setInterval(function() {
        if (webs.structurer !== false) {
          self.crawler();
        }
      }, timeout * 60000);
    });

  },
  crawler: function() {
    var self = this;
    console.log('started crawling');
    var Structures = [],
      Sitemap = [];
    new Crawler().configure({
        ignoreRelative: self.params.realtive,
        depth: self.params.depth,
        shouldCrawl: function(url) {
          return pathExcl(url, self.params);
        }
      })
      .crawl(self.params.website, function onSuccess(page) {
        Sitemap.push(page.url);
        Structures.push({
          url: page.url,
          content: page.content
        });
        // console.log(page);
      }, null, function onAllFinished(crawledUrls) {

          Sitemap = {
            timestamp: new Date(),
            sitemap: Sitemap,
            website: self.params.website
          };
          var sm = new SiteMap(Sitemap);
          sm.save(function(err, data) {
            console.log('SiteMap Saved');
          })
        
        new logger(self.params.website, Structures);
      });
  }
}

module.exports = structurer;
