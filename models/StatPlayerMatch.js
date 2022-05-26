const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    player: String,
    team: String,
    match: String,
    opponent: String,
    date: Date,
    points: Number,
    rebounds: Number,
    assists: Number,
})

module.exports = mongoose.model('StatPlayerMatch', UserSchema);