/**
 Module dependencies
**/
var express     = require('express'),
    app         = module.exports = express(),
    domain      = require('domain'),
    mongoose    = require('mongoose')
    http        = require('http'),
    bodyParser  = require('body-parser'),
    conf        = require('./config'),
    jwt         = require('jsonwebtoken'),
    morgan      = require('morgan'),
    Init        = require('./app/services/init');
/**
 Connect to database
**/
mongoose.connect(conf.dbUrl);

//define secret for token
app.set('secret', conf.secret);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// log requests to the console
app.use(morgan('dev'));

//server port
app.set('port', process.env.PORT || conf.port);

//public screenshots
app.use("/img", express.static(__dirname + '/app/screens'));

//Allow cors
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', ['Content-Type', 'x-access-token']);

    next();
}
app.use(allowCrossDomain);

routes = require('./app/routes')(app);
// anti crash
d = domain.create();
d.on('error', function(err) {
    console.error(err);
});

var http = require('http');
http.createServer(app).listen(app.get('port'), function() {
    console.log('Welcome to pingSth sir');
    console.log('Im listening on port: ' + app.get('port'));
    Init();
});
