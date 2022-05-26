const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user: String,
    team: String,
    opponent: String,
    scoreOne: Number,
    scoreTwo: Number,
    date: Date
})

module.exports = mongoose.model('Match', UserSchema);