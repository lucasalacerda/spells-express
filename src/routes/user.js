var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.route('/users')
    .post(userController.createUser)
    .get(userController.getAll);

router.route('/users/:id')
    .put(userController.updateUser)
    .delete(userController.removeUser);

router.route('/users/search')
    .get(userController.getUserByEmail);

module.exports = router;
