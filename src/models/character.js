const mongoose = require('mongoose');

const Character = mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    background: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    spells: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Spell',
            required: true
        }
    ]   
});

module.exports = mongoose.model('Character', Character);