const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseSchema = mongoose.Schema({
    user: String,
    title: String,
    imageUrl: String,
    description: String,
    value: [String]
})

module.exports = mongoose.model('Exercise', ExerciseSchema);