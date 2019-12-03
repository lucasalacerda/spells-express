const mongoose = require('mongoose');

const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    document: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    characters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
        required: false
    }],
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