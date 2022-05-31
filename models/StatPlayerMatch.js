const mongoose = require('mongoose');

const StatPlayerSchema = mongoose.Schema({
    player: String,
    playerName: String,
    team: String,
    match: String,
    opponent: String,
    date: Date,
    points: Number,
    rebounds: Number,
    assists: Number,
})

module.exports = mongoose.model('StatPlayerMatch', StatPlayerSchema);