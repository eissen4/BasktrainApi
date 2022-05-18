const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user: String,
    exercise: String,
    value: Number
})

module.exports = mongoose.model('Value', UserSchema);