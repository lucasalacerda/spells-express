var express = require('express');
var router = express.Router();

var authController = require('../controllers/authController');

router.post('/authenticate', authController.authenticate);

module.exports = router;
