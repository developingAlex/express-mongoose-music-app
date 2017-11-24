//ensure we have an established connection to the db
const mongoose = require('./init') // works from the 'module.exports = mongoose' line in init.js

// (This code came from the example at mongoosejs.com)
// define our model
const Artist = mongoose.model('Artist', {name: {
  type: String,
  required: true
}});

module.exports = Artist