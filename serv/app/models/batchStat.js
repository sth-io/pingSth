// app/models/Note.js
// load the things we need
var mongoose = require('mongoose')

// define the schema for our user model
var statusSchema = new mongoose.Schema({
    website: String,
    timestamp: Date,
    up: Number,
    down: Number,
    total: Number
})

// // create the model for users and expose it
mongoose.model('batchStat', statusSchema)
module.exports = mongoose.model('batchStat', statusSchema)
