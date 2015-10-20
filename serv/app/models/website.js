// app/models/Note.js
// load the things we need
var mongoose = require('mongoose')

// define the schema for our user model
var websiteSchema = new mongoose.Schema({
    website: String,
    timeout: Number,
    pinging: Number,
    owner: Object,
    up: Number,
    down: Number,
    total: Number,
    edit: Date
})

// // create the model for users and expose it
mongoose.model('Websites', websiteSchema)
module.exports = mongoose.model('Websites', websiteSchema)
