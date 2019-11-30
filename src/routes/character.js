const express = require('express');
const router = express.Router();

const character = require('../controllers/characterController');

router.route('/characters')
    .post(character.createCharacter)
    .get(character.getAll);

module.exports = router;