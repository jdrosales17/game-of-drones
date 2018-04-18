var express = require('express');
var router = express.Router();
var playerController = require('../controllers/playerController.js');

router.get('/', playerController.list);
router.post('/', playerController.createOrUpdate);

module.exports = router;
