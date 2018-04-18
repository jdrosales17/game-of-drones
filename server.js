var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose   = require('mongoose');
var playerRoutes = require('./routes/playerRoutes');
var gameRoutes = require('./routes/gameRoutes');

mongoose.connect('mongodb://localhost/game-of-drones');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// Test route
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the game of drones API!' });   
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Registering our routes
app.use('/', router);
app.use('/players', playerRoutes);
app.use('/games', gameRoutes);

// Starting the server
app.listen(port);
console.log('API is running on port ' + port);
