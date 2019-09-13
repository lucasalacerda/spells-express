const mongoose = require('mongoose');

const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', User);