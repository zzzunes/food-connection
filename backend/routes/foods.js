const router = require('express').Router();
const Food = require('../models/food.model');

router.route('/').get((req, res) => {
    Food.find()
        .then(foods => res.json({ result: 1, foods: foods }))
        .catch(err => res.status(400).json({ result: 0, message: 'Error' + err }));
});

router.route('/add').post((req, res) => {
    const food = req.body;
    const newFood = new Food(food);
    newFood.save()
        .then(() => res.json({ result: 1, message: 'Food added!' }))
        .catch(err => res.status(400).json({ result: 0, message: 'Error: ' + err }));
});

module.exports = router;
