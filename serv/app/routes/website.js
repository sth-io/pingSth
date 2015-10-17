// API USER ROUTES -------------------
var app = require('../../app'),
  express = require('express'),
  apiRoutes = express.Router(),

  sUser = require('../services/user'),
  auth = require('../services/auth'),

  Websites = require('../models/website'),
  Ping = require('../services/ping'),
  Status = require('../models/status'),
  ObjectId = require('mongoose').Types.ObjectId;

// DEFAULT NO TOKEN RETURN
var notoken = function(res) {
  res.status(400).json({
    error: "Token Invalid"
  });
}


// DEFINE ROUTES -------------------
apiRoutes.route('/status/:website')
  .get(function(req, res) {
    Websites.findOne({
      _id: new ObjectId(req.params.website)
    }, function(err, data) {
      if (data) {
        Status.findOne({
          website: data.website
        }, {}, {
          sort: {
            'timestamp': -1
          }
        }, function(err, status) {
          console.log(status);
          res.status(200).json(status);
        })
      } else {
        res.status(200);
      }
    })
  });

apiRoutes.route('/xstatus/:website/:qty')
  .get(function(req, res) {
    Websites.findOne({
      _id: new ObjectId(req.params.website)
    }, function(err, data) {
      if (data) {
        var q = Status.find({
          website: data.website
        }).sort({
          'timestamp': -1
        }).limit(req.params.qty);
        q.exec(function(err, statuses) {
          res.status(200).json(statuses);

        });
      } else {
        res.status(200);
      }
    })
  });


apiRoutes.route('/websites')
  .get(function(req, res) {
    auth(req, function(cb) {
      if (cb) {
        Websites.find({
          owner: cb.email
        }, function(err, data) {
          res.status(200).json(data);
        })
      } else {
        notoken(res);
      }
    })
  })
  .post(function(req, res) {
    auth(req, function(cb) {
      if (cb) {
        Websites.findOne({
          owner: cb.email,
          website: req.body.website
        }, function(err, webs) {
          if (webs) {
            res.status(200).json('already exist');
          } else {
            var webs = req.body;
            webs.owner = cb.email;
            webs = new Websites(webs);
            webs.save(function(err, data) {
              new Ping(webs);
              console.log(webs)
              res.status(200).json(data);
            });
          }
        })
      } else {
        notoken(res);
      }
    })
  });

// make our route visible for ../routes.js
module.exports = apiRoutes;
