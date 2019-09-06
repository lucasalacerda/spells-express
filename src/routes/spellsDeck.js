var express = require('express');
var router = express.Router();

var spellController = require('../controllers/spellController');

router.get('/spells', spellController.getAll);
router.post('/spells', spellController.create);

module.exports = router;
