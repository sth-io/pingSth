// app/models/Note.js
// load the things we need
var mongoose = require('mongoose')

// define the schema for our user model
var statusSchema = new mongoose.Schema({
    website: String,
    status: Boolean,
    timestamp: Date,
    response: Number
})

// // create the model for users and expose it
mongoose.model('Status', statusSchema)
module.exports = mongoose.model('Status', statusSchema)
