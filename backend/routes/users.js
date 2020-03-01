const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const user = req.body;
    const newUser = new User(user);
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(() => res.json('User added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
    })
});

router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username }).then(user => {
        if (!user) return res.status(400).json("Error: User not found.");
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                res.json("User valid!");
            }
            else {
                res.status(400).json("Password invalid.");
            }
        })
    }).catch(err => res.status(400).json("User invalid."));
});

module.exports = router;
