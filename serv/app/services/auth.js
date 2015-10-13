var jwt = require('jsonwebtoken'),
    conf = require('../../config');
module.exports = function(req, cb) {
    if ("token" in req.body || "token" in req.query || 'x-access-token' in req.headers) {
        // verifies secret and checks exp
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        jwt.verify(token, conf.secret, function(err, decoded) {
            if (err) {
                cb(false);
            } else {
                // if everything is good, save to request for use in other routes
                cb(decoded);
            }
        });

    } else {
        // if there is no token
        // return an error
        return false;

    }
};