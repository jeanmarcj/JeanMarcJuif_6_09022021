const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true,
    },
    description: { type: String, required: true },
    mainPepper: {
        type: String,
        required: true,
        trim: true,
    },
    imageUrl: { type: String, required: true },
    heat: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: [{ type: String }],
    usersDisliked: [{ type: String }]
});

module.exports = mongoose.model('Sauce', sauceSchema);