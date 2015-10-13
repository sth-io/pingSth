// API USER ROUTES -------------------
var app = require('../../app'),
    express = require('express'),
    apiRoutes = express.Router(),

    sUser = require('../services/user'),
    auth = require('../services/auth');

// DEFAULT NO TOKEN RETURN
var notoken = function(res) {
    res.status(400).json({
        error: "Token Invalid"
    });
}


// DEFINE ROUTES -------------------

    apiRoutes.route('/user')
        .post(function(req, res) {
            sUser.register(req, res);
        })
        .put(function(req, res) {
            
        auth(req, function(cb) {
            if (cb) {
                sUser.edit(req, res,cb);
            } else {
                notoken(res);
            }
        });
        })
    .get(function(req, res) {
        auth(req, function(cb) {
            if (cb) {
                res.status(200).json(cb);
            } else {
                notoken(res);
            }
        })
    });
    apiRoutes.route('/auth')
        .post(function(req, res) {
            sUser.auth(req, res);
        })

// make our route visible for ../routes.js
module.exports = apiRoutes;