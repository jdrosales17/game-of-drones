var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roundSchema = new Schema({
  p1Move: String,
  p2Move: String,
  winner: String
});

var gameSchema = new Schema({
  p1: String,
  p2: String,
  rounds: [roundSchema],
  winner: String
});

module.exports = mongoose.model('game', gameSchema);
