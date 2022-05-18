const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    player: String,
    match: String,
    points: Number,
    rebounds: Number,
    assists: Number,
})

module.exports = mongoose.model('StatPlayerMatch', UserSchema);