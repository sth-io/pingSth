// app/models/Note.js
// load the things we need
var mongoose = require('mongoose')

// define the schema for our user model
var sitemapSchema = new mongoose.Schema({
  timestamp: Date,
  sitemap: Object,
  website: String
})

// // create the model for users and expose it
mongoose.model('SiteMap', sitemapSchema)
module.exports = mongoose.model('SiteMap', sitemapSchema)
