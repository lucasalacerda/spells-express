const Character = require('../models/character');
const ObjectId = require('mongodb').ObjectID;

exports.getAll = async (req, res, next) => {
    let characters;

    try {
        characters = await Character

            .find({})
            .populate({
                
                path: 'class',
                model: 'Class',
            })
            .populate(
                {
                    path: 'spells',
                    model: 'Spell',
                }

            );
    } catch (err) {
        res.status(422).send(err);
    }
    res.json(characters);
}

exports.getCharacterById = async (req, res, next) => {
    let characters;

    try {
        characters = await Character
            .findById({ _id: ObjectId(req.params.id) })
            .populate('class', 'className -_id')
            .populate('spells', 'title -_id, description -_id');
    } catch (err) {
        res.status(422).send(err);
    }
    res.json(characters);
}

exports.createCharacter = async (req, res, next) => {
    let character = {
        nickname: req.body.nickname,
        class: req.body.class,
        background: req.body.background,
        img: req.body.img,
        spells: req.body.spells,
        level: req.body.level
    };

    let characterCreated;

    try {
        characterCreated = await Character
            .create(character)
            .populate('class', 'className -_id')
            .populate('spells', 'title -_id, description -_id');
    } catch (err) {
        res.status(422).send(err);
    }
    res.status(201).json({
        message: 'Character created successfully!',
        character: characterCreated
    });
}

exports.updateCharacter = async (req, res, next) => {
    try {
        characterUpdated = await Character
            .findOneAndUpdate({
                _id: ObjectId(req.params.id)
            }, req.body)
            .populate('class', 'className -_id')
            .populate('spells', 'title -_id, description -_id');
    } catch (err) {
        return res.status(422).send({
            message: err
        });
    }
    res.status(200).json({
        message: 'Character updated successfully!',
        character: characterUpdated
    });
}

exports.removeCharacter = async (req, res, next) => {
    try {
        characterDeleted = await Character.findByIdAndRemove({
            _id: ObjectId(req.params.id)
        })
            .populate('class', 'className -_id')
            .populate('spells', 'title -_id, description -_id');
    } catch (err) {
        return res.status(422).send({
            messageError: err
        });
    }
    res.status(200).json({
        message: 'Character deleted successfully!',
        character: characterDeleted
    });
}