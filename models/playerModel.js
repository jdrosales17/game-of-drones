var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
  name: String,
  wins: Number
});

module.exports = mongoose.model('player', playerSchema);
