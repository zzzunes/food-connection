const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const passwordMinimum = 6;
const usernameMinimum = 3;
const majorMinimum = 3;

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

router.route('/update').post((req, res) => {
    if (req.body.user.username.length < usernameMinimum) {
        return res.json({result: 0, message: "Username must be at least 3 characters."});
    }
    if (req.body.user.age < 18) {
        return res.json({result: 0, message: "User must be at least 18 years old."});
    }
    if (req.body.user.height === "" || req.body.user.height < 0 ||
        req.body.user.weight < 0 || req.body.user.weight === "") {
        return res.json({result: 0, message: "User must have a positive weight and height."});
    }
    if (req.body.user.major.length < majorMinimum) {
        return res.json({result: 0, message: "User must have a major (3 characters or greater)."});
    }
    User.findByIdAndUpdate(req.body.user._id,
        { $set: req.body.user },
        function(err, result) {
            if (err) return res.json({result: 0, message: "Error: " + err});
            return res.json({result: 1, message: "Updated successfully!"});
        });
});

module.exports = router;
