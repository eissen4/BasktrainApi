const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    user: String,
    exercise: {type: Schema.Types.ObjectId, ref: 'Exercise'},
    value: Number
})

module.exports = mongoose.model('Value', UserSchema);