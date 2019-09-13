var express = require('express');
var router = express.Router();

var spellController = require('../controllers/spellController');

router.get('/spell', spellController.getAll);
router.post('/spell', spellController.create);

module.exports = router;
