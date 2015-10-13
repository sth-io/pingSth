// SERVER CONFIG
// MongoDB setup
var db = {
    dbUser: 'monitorSth',
    dbPassword: 'test',
    dbName: 'monitorSth',
    dbHost: 'localhost',
    dbPort: '27017'
}; 
var server = {
    port: '4000',
    secret: 'EverythingStartsOutOfSth'
}

module.exports = {
    // port at which server listens
	port: server.port,
    dbUrl: 'mongodb://'+db.dbUser+':'+db.dbPassword+'@'+db.dbHost+':'+db.dbPort+'/'+db.dbName,
    secret: server.secret

};

// db.createUser( { user: "noteSth", pwd: "test", roles: [ { role: "readWrite", db: "noteSth" } ] } )
