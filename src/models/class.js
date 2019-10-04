const mongoose = require('mongoose')

const Class = mongoose.Schema({
    className: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    icon: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Class', Class);