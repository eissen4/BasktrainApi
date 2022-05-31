const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Value = require('../models/Value');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

router.post('/', verify, async (req, res) => {
    const decoded = jwt.decode(req.header('Authorization'), process.env.SECRET_TOKEN);

    const value = await Value.findOneAndUpdate({user: decoded._id, exercise: req.body.exercise},
        { value: req.body.value, exercise: req.body.exercise, user: decoded._id, _id: new mongoose.Types.ObjectId()},
        { new: true, upsert: true });
    res.json(value);
});

router.patch('/:valueId', verify, async (req, res) => {
    try {
        const updatedValue = await Users.updateOne(
            {_id: req.params.valueId},
            {$set: { value: req.body.value} }
        );
        res.json(updatedValue);
    }catch (err){
        res.json({message: err});
    }
});

module.exports = router;