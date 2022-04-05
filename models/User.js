const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    data: {
        name: String,
        email: String
    }
})

module.exports = mongoose.model('Users', UserSchema);