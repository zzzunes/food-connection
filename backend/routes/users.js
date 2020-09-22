const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const passwordMinimum = 6;
const usernameMinimum = 3;
const majorMinimum = 3;

function exists(obj) {
    return obj && obj !== 'null' && obj !== 'undefined';
}

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const user = req.body;
    if (exists(user)) return res.status(400).json({ result: 0, message: "Error: User cannot be null." });
    const newUser = new User(user);
    if (newUser.password.length < passwordMinimum) {
        return res.status(400).json({ result: 0, message: "Error: Password length must be at least 6 characters." });
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(() => res.json({ result: 1, message: 'User added!', user: newUser }))
                .catch(err => res.status(400).json({ result: 0, message: 'Error: ' + err }));
        })
    })
});

router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username }).then(user => {
        if (!user) return res.status(400).json({ result: 0, message: "Error: User not found." });
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                res.json({ result: 1, message: "User valid!", user: user });
            }
            else {
                res.status(400).json({ result: 0, message: "Password invalid." });
            }
        })
    }).catch(err => res.status(400).json({ result: 0, message: "User invalid." }));
});

router.route('/update').post((req, res) => {
    const user = req.body.user;
    if (exists(user.username) && user.username.length < usernameMinimum) {
        return res.status(400).json({ result: 0, message: "Username must be at least " + usernameMinimum + " characters." });
    }
    if (exists(user.age) && user.age < 18) {
        return res.status(400).json({ result: 0, message: "User must be at least 18 years old." });
    }
    if (exists(user.height) && user.height === "" || user.height < 0 ||
        user.weight < 0 || user.weight === "") {
        return res.status(400).json({ result: 0, message: "User must have a positive weight and height." });
    }
    if (exists(user.major) && user.major.length < majorMinimum) {
        return res.status(400).json({ result: 0, message: "User must have a major (3 characters or greater)." });
    }
    if (exists(user.password) && user.password.length < passwordMinimum) {
        return res.status(400).json({ result: 0, message: "Password must be at least " + passwordMinimum + " characters." });
    }

    User.findByIdAndUpdate(user._id,
        { $set: user },
        function (err, result) {
            if (err) return res.status(400).json({ result: 0, message: "Error: " + err });
            return res.json({ result: 1, message: "Updated successfully!" });
        });
});

module.exports = router;
