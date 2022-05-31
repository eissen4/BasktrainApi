const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    user: String,
    exercise: String,
    comment: String
})

module.exports = mongoose.model('Comment', CommentSchema);