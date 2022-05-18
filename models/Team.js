const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    user: String
})

module.exports = mongoose.model('Team', UserSchema);