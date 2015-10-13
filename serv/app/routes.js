var app = require('../app'),
    user = require('./routes/user'),
    website = require('./routes/website');

// BUILD STRUCTURE FOR ROUTES
app.use('/api', user);
app.use('/api', website);


// WE CAN PUT DOCUMENTATION HERE
module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.end('Welcome to API');
    });
}
