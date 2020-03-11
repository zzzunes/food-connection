const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const passwordMinimum = 6;

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const user = req.body;
    const newUser = new User(user);
    if (newUser.password.length < passwordMinimum) {
        return res.json({result: 0, message: "Error: Password length must be at least 6 characters."});
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(() => res.json({result: 1, message: 'User added!', user: newUser }))
                .catch(err => res.json({result: 0, message: 'Error: ' + err}));
        })
    })
});

router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username }).then(user => {
        if (!user) return res.json({result: 0, message: "Error: User not found."});
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                res.json({result: 1, message: "User valid!", user: user});
            }
            else {
                res.json({result: 0, message: "Password invalid."});
            }
        })
    }).catch(err => res.json({result: 0, message: "User invalid."}));
});

module.exports = router;
