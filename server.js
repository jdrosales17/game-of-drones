var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

// Test route
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the game of drones API!' });   
});

// Registering our routes
app.use('/api', router);

// Starting the server
app.listen(port);
console.log('API is running on port ' + port);