const User = require('../models/User');
// Hash password in Data Base
const bcrypt = require('bcrypt');
// Token Authentification
const jwt = require('jsonwebtoken');
// Mask the user email adress in the Data Base
const MaskData = require('maskdata');
// Prevent SQL injections with a filter
const sanitize = require('../middleware/sanitize');

/**
 * User sign up
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: MaskData.maskEmail2(req.body.email),
            password: hash,
        });
        user.save()
        .then(() => res.status(201).json({message: 'New user created !'}))
        .catch(err => res.status(400).json({err}));
    })
    .catch(err => res.status(500).json(err));
};

exports.login = (req, res, next) => {
    const sanitized = sanitize(req.body.email);
    User.findOne({ email: MaskData.maskEmail2(sanitized) })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'User not found !'});
        }
        const sanitizedPassWord = sanitize(req.body.password);
        bcrypt.compare(sanitizedPassWord, user.password)
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

