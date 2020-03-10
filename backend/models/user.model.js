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
        default: 25,
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
        default: "non-binary",
    },
    activityLevel: {
        type: String,
        default: "sedentary",
    },
    race: {
        type: String,
        default: "unknown",
    },
    major: {
        type: String,
        default: "undeclared",
    },
    dataCollection: {
        type: Boolean,
        default: false,
    }
},);

const User = mongoose.model('User', userSchema);
module.exports = User;
