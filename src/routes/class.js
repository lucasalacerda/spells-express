var express = require('express');
var router = express.Router();

var classController = require('../controllers/classController');

router.route('/class')
    .post(classController.create)
    .get(classController.getAll);

module.exports = router;
