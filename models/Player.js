const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    name: String,
    team: String,
    height: String,
    weight: String,
    image: String
})

module.exports = mongoose.model('Player', PlayerSchema);