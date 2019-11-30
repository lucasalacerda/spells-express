var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.get('x-auth-token');
    if (!token) res.status(403).send("Please insert token");
    else {
        console.log(token)
        jwt.verify(token, "$en@c", (err, id) => {
            console.log(id)
            if (err) {
                res.status(401).send(err);
            }
            else {
                console.log(id)
                next();
            }
        });
    }
}

exports.authenticate = (req, res, next) => {
    const login = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({ email: login.email }, function (err, user) {
        if (err) {
            next(err);
            console.log(err);
        }
        else {
            if (bcrypt.compareSync(login.password, user.password)) {
                const token = jwt.sign(
                    { id: user.id },
                    "$en@c",
                    { expiresIn: '1h' }
                );
                res.status(200).json({
                    status: "OK",
                    data: {
                        token: token
                    }
                });
            }
            else {
                res.json({
                    status: "NOK",
                    message: "Invalid email/password!!!",
                    data: null
                });

                jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: login.email
                }, '$en@c');
            }
        }
    });
}