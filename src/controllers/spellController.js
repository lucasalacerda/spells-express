var Spell = require('../models/spell');

exports.getAll = async (req, res, next) => {
    let spells;

    try {
        spells = await Spell
        .find({})
        .populate('class', 'className -_id');
    } catch(err) {
        res.status(412).send(err);
    }

    res.json(spells);
}

exports.getSpellById = async (req, res, next) => {
    let spell;
    
    try {
        spell = await 
            Spell
            .findById(req.params.id)
            .populate('class')
    } catch(err) {
        res.status(412).send({
            errorMessage: "Id does not exist",
            exception: err
        });
    }
    res.json(spell);
}

exports.create = async (req, res, next) => {
    const spell = {
        title: req.body.title,
        description: req.body.description,
        level: req.body.level,
        class: req.body.class,
        img: req.body.img,
    }

    let spellCreated;

    try {
        spellCreated = await Spell.create(spell);
    } catch(err) {
        res.status(412).send(err);
    }
    res.status(201).json({
        message: "Spell created successfully!",
        spellCreated
    });
}