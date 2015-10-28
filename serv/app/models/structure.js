// app/models/User.js
// load the things we need
var mongoose = require('mongoose')

// define the schema for our user model
var structureSchema = new mongoose.Schema({
    timestamp: Date,
    structure: Object,
    website: String
})

// // create the model for users and expose it
mongoose.model('Structure', structureSchema)
module.exports = mongoose.model('Structure', structureSchema)
