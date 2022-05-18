const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user: String,
    opponent: String,
    scoreOne: Number,
    scoreTwo: Number
})

module.exports = mongoose.model('Match', UserSchema);