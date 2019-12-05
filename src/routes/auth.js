var express = require('express');
var router = express.Router();

var authController = require('../controllers/authController');

router.route('/authenticate')
    .post(authController.authenticate);

router.route('/verify')
    .post(authController.verifyToken);

module.exports = router;
