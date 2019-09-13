var Spell = require('../models/spell');

exports.getAll = (req, res, next) => {
    Spell.find({},(err, spells) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(spells); 
    });
}

exports.create = (req, res, next) => {
    var spell = {
        title: req.body.title,
        description: req.body.description,
        level: req.body.level,
        class: req.body.class,
        img: req.body.img,
    }

    Spell.create(spell, (err, spell) => {
        if(err) {
            res.json({
                error: err
            });
        }
        res.json({
            message: "Spell created successfully!",
            spell
        });
    });
}