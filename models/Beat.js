const mongoose = require('mongoose');

const BeatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for the beat'],
    },
    genre: String,
    mood: String,
    tags: String,
    key: String,
    scale: String,
    tempo: {
        type: Number,
        min: 50,
        max: 250
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
    },
    isFree: {
        type: Boolean,
        required: true,
        default: false,
    },
    isVisible: {
        type: Boolean,
        required: true,
        default: true,
    }
})


const Beat = mongoose.model('Beat', BeatSchema)
module.exports = Beat;