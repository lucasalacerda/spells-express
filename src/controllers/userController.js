var User = require('../models/user');

exports.getAll = (req, res, next) => {
    User.find({},(err, spells) => {
        if(err){
            res.status(412).send(err);
        }
        res.json(spells); 
    });
}

exports.getUserByEmail = (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(err) {
            res.status(412).send(err);
        } 
        res.json(user);
    });
}

exports.register = (req, res, next) => {
    var user = {
        name: req.body.name,
        document: req.body.document,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        img: req.body.img
    }

    User.create(user, (err, user) => {
        if(err) {
            res.json({
                error: err
            });
        }
        res.json({
            message: "User register successfully!"
        });
    });
}