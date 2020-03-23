const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    signUpDate: {
        type: Date,
        default: Date.now(),
    },
    age: {
        type: Number,
        default: 20,
    },
    weight: {
        type: Number,
        default: 150,
    },
    height: {
        type: Number,
        default: 66,
    },
    gender: {
        type: String,
        default: "Non-Binary",
    },
    activityLevel: {
        type: String,
        default: "Sedentary",
    },
    race: {
        type: String,
        default: "Unknown",
    },
    major: {
        type: String,
        default: "Undeclared",
        minlength: 3,
    },
    foodHistory: {
        type: Array,
        default: [],
    },
    recommendedCalories: {
        type: Object,
        default: {
            total: 0,
            fat: 0,
            carbohydrates: 0,
            protein: 0,
        }
    },
},);

const User = mongoose.model('User', userSchema);
module.exports = User;
