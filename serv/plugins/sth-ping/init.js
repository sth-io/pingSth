var Deps = require(GLOBAL.conf.srvcPath+'dependencies'),
    Ping = require('./pinging');
    // Website = require(Deps.Model.Website);

function Init() {
    Deps.Model.Website.find({}, function(err, websites) {
        for (var i = 0, len = websites.length; i < len; i++) {
            new Ping(websites[i]);
        }
    })
}

module.exports = Init;
