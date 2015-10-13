var check = require('./../functions/checkReqKeys'),
    User = require('./../models/user'),
    bcrypt = require('bcrypt-nodejs'),
    app = require('../../app'),
        
    reqKey = {
        'email': 'email',
        'password': 'string'
    };

module.exports = {
    register: function(req, res) {
        req.body.password = bcrypt.hashSync(req.body.password);
        if (check(req.body, reqKey)) {
            User.findOne({
                email: req.body.email
            }, function(err, fuser) {
                if (!fuser) {
                    req.body.dateAdded = new Date();
                    req.body.status = 0;
                    user = new User(req.body);
                    user.save(function(err, usr) {
                        if (err) res.status(400).json(err);
                        res.status(200).json(usr);
                    })
                } else {
                    res.status(400).json({
                        error: 'email already in use'
                    });
                }
            });
        }
    },
    edit: function(req, res, usr) {
        req.body.dateModified = new Date();
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password);
        }
        User.update({
                "_id": usr._id
            }, {
                $set: req.body
            },
            function(err, user) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(200).json(user);
                }
            })

    },
    remove: function(req, res) {
        //to be implemeneted
    },
    auth: function(req, res) {
        User.findOne({
            email: req.body.email
        }, function(err, user) {

            if (err) throw err;
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {
                console.log(user.password)
                // check if password matches
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, conf.secret, {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }


        })
    }
}