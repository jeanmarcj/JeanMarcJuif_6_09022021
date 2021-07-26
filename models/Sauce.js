const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String},
    name: { type: String },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: [{ type: String }],
    usersDisliked: [{ type: String }]
});

module.exports = mongoose.model('Sauce', sauceSchema);