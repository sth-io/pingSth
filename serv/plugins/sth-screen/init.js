var Deps = require(GLOBAL.conf.srvcPath+'dependencies'),
    Screen = require('./screen');

function Init() {
    Deps.Model.Website.find({}, function(err, websites) {
        for (var i = 0, len = websites.length; i < len; i++) {
        // console.log(websites[i].website)
            new Screen(websites[i].website);
        }
    })
}

module.exports = Init;
