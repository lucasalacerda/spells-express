var Spells = require('../models/spells');

exports.create = (req, res, next) => {
    var spell = {
        title: req.body.title,
        description: req.body.description,
        level: req.body.level,
        class: req.body.class,
        img: req.body.img,
    }

    Spells.create(spell, (err, spell) => {
        if(err) {
            res.json({
                error: err
            });
        }
        res.json({
            message: "Spell created successfully!"
        });
    });
}