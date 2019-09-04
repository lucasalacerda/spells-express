var express = require('express');
var router = express.Router();

var spellController = require('../controllers/spellController');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

router.get('/spells', spellController.getAll);
router.post('/spells', spellController.create);

module.exports = router;
