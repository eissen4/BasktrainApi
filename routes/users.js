const express = require('express');
const User = require('../models/User');
const Users = require('../models/User')
const router = express.Router();
const verify = require('./verifyToken')

router.get('/', verify, async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users)
    }catch (err) {
        res.json({message:err});
    }
})

router.post("/", async (req, res) => {
    console.log(req.body);
    const post = new Users({
        name: req.body.name,
        age: req.body.age,
        location: {
            adress : req.body.location.adress,
            postcode : req.body.location.postcode,
        }
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    };
    
});

router.get('/:userId', verify, async (req, res) => {
    try {
        const user = await Users.findById(req.params.userId);
        res.json(user);
    }catch (err){
        res.json({message: err});
    }
    
});

router.delete('/:userId', async (req, res) => {
    try {
        const removeUser = await Users.deleteOne({_id: req.params.userId});
        res.json(removeUser);
    }catch (err){
        res.json({message: err});
    }
    
});

router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await Users.updateOne(
            {_id: req.params.userId},
            {$set: { name: req.body.name} }
        );
        res.json(updatedUser);
    }catch (err){
        res.json({message: err});
    }
    
});


module.exports = router;