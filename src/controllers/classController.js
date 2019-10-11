var Class = require('../models/class');

exports.getAll = (req, res, next) => {
    Class.find({},(err, classList) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(classList); 
    })
}

exports.create = (req, res, next) => {
    var classBody = {
        className: req.body.className,
        description: req.body.description,
        icon: req.body.icon,
    }

    Class.create(classBody, (err, classBody) => {
        if(err) {
            res.json({
                error: err
            });
        }
        res.json({
            message: "Spell created successfully!",
            classBody
        });
    });
}