// SERVER CONFIG
// MongoDB setup
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

module.exports = {
    // port at which server listens
	  port: server.port,
    dbUrl: 'mongodb://'+db.dbUser+':'+db.dbPassword+'@'+db.dbHost+':'+db.dbPort+'/'+db.dbName,
    secret: server.secret,
    mail: mail,
    serv: server
};

// db.createUser( { user: "ping", pwd: "ping", roles: [ { role: "readWrite", db: "ping" } ] } )
// db.addUser( { user: "ping", pwd: "ping", roles: ["readWrite" ] } )
