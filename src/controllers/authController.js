const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const populateCharacter = require('../helpers/populateMongoose');

exports.verifyToken = (req, res, next) => {
    const token = req.get('x-auth-token');
    if (!token) res.status(403).send("Please insert the token.");
    else {
        jwt.verify(token, "$en@c", (err, user) => {
            if (err) {
                res.status(401).send(err);
            }
            else {
                res.status(200).json({
                    id: user.id,
                    iat: user.iat,
                    exp: user.exp
                })
            }
        });
    }
}

exports.authenticate = async (req, res, next) => {
    const login = {
        email: req.body.email,
        password: req.body.password
    }

    let userFound;

    try {
        userFound = await User.findOne({ email: login.email })
        if (userFound !== null) {
            if (bcrypt.compareSync(login.password, userFound.password)) {
                const token = jwt.sign(
                    {id: userFound.id}, '$en@c', {expiresIn: '1h'}
                );
                res.status(200).json({
                    data: {
                        token: token
                    }
                });
            }
            else {
                res.status(422).json({
                    messageError: 'Invalid email/password.',
                });
            }
        }
        else {
            res.status(422).json({
                messageError: 'User not found.'
            })
        }
    } catch (err) {
        next(err);
    }
}