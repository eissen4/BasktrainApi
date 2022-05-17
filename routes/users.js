const express = require('express');
const Users = require('../models/User')
const router = express.Router();
const verify = require('./verifyToken')
const jwt = require('jsonwebtoken');

router.get('/', verify, async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users)
    }catch (err) {
        res.json({message:err});
    }
})

router.get('/token', verify, async (req, res) => {
    const decoded = jwt.decode(req.header('auth-token'), process.env.SECRET_TOKEN);
    console.log(decoded)
    try {
        const users = await Users.findById(decoded._id);
        res.json(users)
    }catch (err) {
        res.json({message:err});
    }
})

router.post("/", async (req, res) => {
    console.log(req.body);
    const post = new Users({
            username: req.body.name,
            password: req.body.password,
            data: {
                name: req.body.data.name,
                email: req.body.data.email
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
    console.log("entra")
    try {
        const updatedUser = await Users.updateOne(
            {_id: req.params.userId},
            {$set: { username: req.body.username} }
        );
        console.log(updatedUser)
        res.json(updatedUser);
    }catch (err){
        console.log("entra3")
        res.json({message: err});
    }
    
});

router.patch('/token/:userId', verify, async (req, res) => {
    const decoded = jwt.decode(req.header('auth-token'), process.env.SECRET_TOKEN);
    console.log(decoded._id)
    try {
        const updatedUser = await Users.updateOne(
            {_id: decoded._id},
            {$set: { username: req.body.username} }
        );
        res.json(updatedUser);
    }catch (err){
        res.json({message: err});
    }
});

module.exports = router;