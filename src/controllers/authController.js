var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const login = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({ email: login.email }, function (err, userInfo) {
        if (err) {
            next(err);
        } else {
            if (bcrypt.compareSync(login.password, userInfo.password)) {
                const token = jwt.sign(
                    { id: userInfo._id },
                    req.app.get('secretKey'),
                    { expiresIn: '1h' }
                );
                res.json({
                    status: "success",
                    message: "user found!!!",
                    data: {
                        user: userInfo, token: token
                    }
                });
            } else {
                res.json({
                    status: "error",
                    message: "Invalid email/password!!!",
                    data: null
                });

                jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: login.email
                }, 'secret');
            }
        }
    });
}