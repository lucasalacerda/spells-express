const express = require('express');
const router = express.Router();

const character = require('../controllers/characterController');

router.route('/characters')
    .post(character.createCharacter)
    .get(character.getAll);

router.route('/characters/:id')
    .delete(character.removeCharacter)
    .get(character.getCharacterById)
    .put(character.updateCharacter);

module.exports = router;