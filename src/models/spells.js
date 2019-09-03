const mongoose = require('mongoose');

var spellsSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    class: {
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

module.exports = mongoose.model('spellsSchema', spellsSchema);