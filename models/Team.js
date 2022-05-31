const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    name: String,
    user: String
})

module.exports = mongoose.model('Team', TeamSchema);