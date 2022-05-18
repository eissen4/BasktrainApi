const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Value = require('../models/Value');
const jwt = require('jsonwebtoken');

router.post('/', verify, async (req, res) => {
    const decoded = jwt.decode(req.header('auth-token'), process.env.SECRET_TOKEN);

    const value = await Value.findOneAndUpdate({user: decoded._id, exercise: req.body.exercise},
        { value: req.body.value },
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