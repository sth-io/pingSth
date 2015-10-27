var Crawler = require("js-crawler"),
  pathExcl = require('./pathExcluder');

function structurer(web) {
  this.params = {};
  this.params.regex = null;
  this.params.depth = 1;
  this.params.relative = false;
  this.init(web);

}


structurer.prototype = {
  init: function(web) {
    if(web.depth > 5) {
      web.depth = 5;
    }
    this.params = web;
    this.crawler();

  },
  crawler: function() {
    var self = this;
    console.log('started crawling');
    var time = new Date();
    new Crawler().configure({
        ignoreRelative: self.params.realtive,
        depth: self.params.depth,
        shouldCrawl: function(url) {
          return pathExcl(url, self.params);
        }})
        .crawl(self.params.website, function onSuccess(page) {
          console.log(page.url)
        }, null, function onAllFinished(crawledUrls) {
          console.log('All crawling finished');
          console.log(crawledUrls);
          var time = new Date() -time;
          console.log(time);
        });
  }
}

module.exports = structurer;
