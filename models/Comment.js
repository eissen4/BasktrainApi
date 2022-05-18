const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user: String,
    exercise: String,
    comment: String
})

module.exports = mongoose.model('Comment', UserSchema);