var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.route('/user')
    .post(userController.register)
    .get(userController.getAll);


//TODO: melhorar para que não precise do /search. Fazer tratamento na funcao
router.route('/user/search')
    .get(userController.getUserByEmail);

module.exports = router;
