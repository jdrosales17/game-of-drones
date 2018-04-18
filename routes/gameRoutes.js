var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController.js');

router.post('/', gameController.create);

module.exports = router;
