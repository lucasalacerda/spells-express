var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.route('/user')
    .post(userController.register)
    .get(userController.getAll);

router.route('/user/search')
    .get(userController.getUserByEmail);

module.exports = router;
