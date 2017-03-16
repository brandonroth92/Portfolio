// create Team model and export
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var teamSchema = new schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  league: { type: String, required: true }
});

module.exports = mongoose.model('Team', teamSchema);