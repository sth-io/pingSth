var statusCodes = require('http').STATUS_CODES,
    request = require('request'),
    colors = require('colors'),
    ObjectId = require('mongoose').Types.ObjectId,
    Deps = require(GLOBAL.conf.srvcPath+'dependencies'),

    Log = Deps.Log,
    Website = Deps.Model.Website;

function Ping(web) {
    this.web = web;
    this.getData(web);
    this.handle = '';
}

Ping.prototype = {
    getData: function(web) {
        var self = this;
        Website.findOne({
            _id: new ObjectId(web._id)
        }, function(err, webs) {
            if (err) {
                // need error handler;
            }
            if (webs && webs.pinging !== 1) {
                webs.update({
                    pinging: 1
                }, function(err, data) {
                    // updated, now start
                    self.web = webs;
                    self.handle = setInterval(function() {
                        self.start(webs);
                    }, webs.timeout * 60000);

                });
            } else {
                // something when not found
            }

        });
    },
    start: function(web) {
        var time = new Date(),
            self = this;
        try {
            // send request
            request(web.website, function(error, res, body) {
                // Website is up
                if (!error && res.statusCode === 200) {
                    self.isOk(time);
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
    isOk: function(st) {
        var time = Date.now();
        time = time - st,
            status = {};

        status.website = this.web.website;
        status.msg = '';
        status.status = 1;
        status.response = time;

        this.log(status);
    },
    isNotOk: function(statusCode) {
        var time = Date.now(),
            status = {};
        status.website = this.web.website;
        status.msg = statusCodes[statusCode + ''];
        status.status = 0;

        this.log(status);
    },
    log: function(status) {
        var self = this,
            output = '';
        output += "\nWebsite: " + status.website;
        if ('response' in status) {
            output += "\nTime: " + status.response;
        }
        output += "\nStatus: " + status.status;
        output += "\nMessage:" + status.msg + "\n";

        if (status.status == 1) {
            console.log(output.green);
        } else {
            console.log(output.red);
        }
        new Log(status);
    }
};

module.exports = Ping;
