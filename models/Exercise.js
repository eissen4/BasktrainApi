const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user: String,
    title: String,
    imageUrl: String,
    description: String
})

module.exports = mongoose.model('Exercise', UserSchema);