// app/models/User.js
// load the things we need
var mongoose = require('mongoose')

// define the schema for our user model
var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    dateAdded: Date,
    dateModified: Date,
    status: Number
})

// // create the model for users and expose it
mongoose.model('User', userSchema)
module.exports = mongoose.model('User', userSchema)