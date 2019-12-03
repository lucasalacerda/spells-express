const User = require('../models/user');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectID;
const characterPopulate = require('../helpers/populateMongoose');

exports.getAll = async (req, res, next) => {
    let users;

    try {
        users = await User.find({})
            .populate(characterPopulate);
    } catch (err) {
        res.status(422).send({
            messageError: err
        });
    }
    res.status(200).send(users);
}

exports.getUserByEmail = async (req, res, next) => {
    let user;
    try {
        user = await User.find({ email: req.query.email })
            .populate(characterPopulate);
    } catch (err) {
        res.status(422).send({
            messageError: err
        });
    }
    res.status(200).json(user);
}

exports.updateUser = async (req, res, next) => {
    let updatedUser;

    try {
        updatedUser = await User
            .findOneAndUpdate({
                _id: ObjectId(req.params.id)
            }, req.body)
            .populate(characterPopulate);
    } catch (err) {
        res.status(422).send({
            messageError: err
        });
    }

    res.status(200).json({
        user: updatedUser,
    })

}

exports.createUser = async (req, res, next) => {
    let userCreated;
    let salt = bcrypt.genSaltSync(10)
    let password = bcrypt.hashSync(req.body.password, salt)

    let user = {
        name: req.body.name,
        document: req.body.document,
        age: req.body.age,
        email: req.body.email,
        password: password,
        img: req.body.img
    }

    try {
        userCreated = await User
            .create(user)
            .populate(characterPopulate);
    } catch (err) {
        res.status(422).send({
            messageError: err
        });
    }
    res.status(201).json({
        message: "User register successfully!",
        user: userCreated
    });
}

exports.removeUser = async (req, res, next) => {
    let userRemoved;
    try {
        userRemoved = await User.findByIdAndRemove({
            _id: ObjectId(req.params.id)
        })
        .populate(characterPopulate);
    } catch(err) {
        res.status(422).send({ 
            messageError: err
        });
    }
    res.status(200).json({
        message: 'User deleted successfully!',
        user: userRemoved
    });
}