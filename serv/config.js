// SERVER CONFIG
// MongoDB setup
var path = require('path');

var db = {
    dbUser: 'ping',
    dbPassword: 'ping',
    dbName: 'ping',
    dbHost: 'localhost',
    dbPort: '27017'
},
// server setup
server = {
    port: '4000',
    secret: 'yourssecret',
    reqCode: false
},
// mailer setup
mail = {
  email: 'notesth@gmail.com',
  password: 'owslen69xD',
  type: 'gmail'
}
var rootPath = function() {
    var root = path.dirname(require.main.filename),
        idx = root.indexOf('/serv');
    root = root.substr(0, idx + 5)+'/';
    return root;
}

module.exports = {
    // port at which server listens
	  port: server.port,
    dbUrl: 'mongodb://'+db.dbUser+':'+db.dbPassword+'@'+db.dbHost+':'+db.dbPort+'/'+db.dbName,
    secret: server.secret,
    mail: mail,
    rootPath: rootPath(),
    srvcPath: rootPath()+'app/services/',
    serv: server
};

// db.createUser( { user: "ping", pwd: "ping", roles: [ { role: "readWrite", db: "ping" } ] } )
// db.addUser( { user: "ping", pwd: "ping", roles: ["readWrite" ] } )
