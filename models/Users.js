const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: String,
    age: Number,
    date: Date.now
})

module.exports = mongoose.model('Users', PostSchema);