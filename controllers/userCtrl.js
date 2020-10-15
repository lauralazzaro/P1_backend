// handles signup and login for users
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const passwordValidator = require('password-validator');
require('dotenv/config');

const pwdCheck = new passwordValidator();

pwdCheck
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces();                           // Should not have spaces

// POST : /api/auth/signup 
exports.signup = (req, res, next) => {

    const emailCipher = crypto.createCipheriv('aes-256-cbc', process.env.USER_KEY, process.env.USER_IV);
    const emailStr = emailCipher.update(req.body.email, 'utf8', 'hex') + emailCipher.final('hex');

    bcrypt.hash(req.body.password, 10)
        .then((hash) => {

            const user = new User({
                email: emailStr,
                password: hash
            });
            if (pwdCheck.validate(req.body.password)) {
                user.save()
                    .then(() => res.status(201).json({ message: 'User created!' }))
                    .catch((error) => res.status(400).json({ error }));
            } else {
                throw new Error;
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

// POST : /api/auth/login 
exports.login = (req, res, next) => {
    // const emailDecipher = crypto.createDecipheriv('aes-256-cbc', process.env.USER_KEY, process.env.USER_IV);
    // const emailStr = emailDecipher.update(req.body.email, 'hex', 'utf8') + emailDecipher.final('utf8');

    const emailCipher = crypto.createCipheriv('aes-256-cbc', process.env.USER_KEY, process.env.USER_IV);
    const emailStr = emailCipher.update(req.body.email, 'utf8', 'hex') + emailCipher.final('hex');

    User.findOne({ email: emailStr })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error });
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        throw new Error;
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};