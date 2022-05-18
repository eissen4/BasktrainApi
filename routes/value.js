const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Value = require('../models/Value');

router.post('/', verify, async (req, res) => {
    if(await Value.exists({user: req.body.user, exercise: req.body.exercise})) {
        console.log("entra")
        try {
            console.log("2")
            const updatedValue = await Users.updateOne(
                {_id: req.params.valueId},
                {$set: { value: req.body.value} }
            );
            res.json(updatedValue);
        }catch (err){ 
            console.log("3")
            res.json({message: err});
        }
    }
    console.log("4")
    try {
        const post = new Value({
            user: req.body.user,
            exercise: req.body.exercise,
            value: req.body.value
        });
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        console.log("5")
        res.json({ message: err });
    };
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