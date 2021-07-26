const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

/**
 * User sign up
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.passord, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
        });
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(err => res.status(400).json({err}));
    })
    .catch(err => res.status(500).json(err));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'User not found !'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Wrong password !'});
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(err => res.status(500).json({ error: err}))
    })
    .catch(err => res.status(500).json({err}));
};

