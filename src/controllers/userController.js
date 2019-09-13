var User = require('../models/user');
var bcrypt = require('bcrypt');

exports.getAll = (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(412).send(err);
        }
        res.json(users);
    });
}

exports.getUserByEmail = (req, res, next) => {
    User.find({email: req.query.email}, (err, user) => {
        if (err) {
            res.status(412).send(err);
        }
        res.json(user);
    });
}

exports.register = (req, res, next) => {

    var salt = bcrypt.genSaltSync(10)
    var password = bcrypt.hashSync(req.body.password, salt)

    var user = {
        name: req.body.name,
        document: req.body.document,
        age: req.body.age,
        email: req.body.email,
        password: password,
        img: req.body.img
    }

    User.create(user, (err, user, next) => {
        if (err) {
            res.status(412).json({
                error: err
            });
        }
        res.status(201).json({
            message: "User register successfully!"
        });
    });
}