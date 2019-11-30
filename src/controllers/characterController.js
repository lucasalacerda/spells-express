const Character = require('../models/character');

exports.getAll = async (req, res, next) => {
    let characters;

    try {
        characters = await Character
            .find({})
            .populate('class', 'className -_id')
            .populate('spells', 'title -_id, description -_id');
    } catch(err) {
        res.status(412).send(err);
    }
    res.json(characters);
}

exports.createCharacter = async (req, res, next) => {

    let character = {
        nickname: req.body.nickname,
        class: req.body.class,
        background: req.body.background,
        img: req.body.img,
        spells: req.body.spells
    }

    let characterCreated;

    try {
        characterCreated = await Character.create(character);
    } catch(err) {
        res.status(420).send(err);
    }
    res.status(201).json({
        message: 'Character created successfully!',
        character: characterCreated
    })
}