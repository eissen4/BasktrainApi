const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user: String,
    contrincante: String,
    resultado: String
})

module.exports = mongoose.model('Match', UserSchema);