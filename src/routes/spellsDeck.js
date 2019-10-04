var express = require('express');
var router = express.Router();

var spellController = require('../controllers/spellController');

router.route('/spell')
    .post(spellController.create)
    .get(spellController.getAll);

router.route('/spell/:id')
    .get(spellController.getSpellById)


module.exports = router;
