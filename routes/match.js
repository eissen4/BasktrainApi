const express = require('express');
const Match = require('../models/Match')
const router = express.Router();
const verify = require('./verifyToken')
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        const match = await Match.find()
        console.log(match);
        res.json(match)
    }catch (err) {
        res.json({message:err});
    }
});

router.post("/", async (req, res) => {
    console.log(req.body);
    const post = new Match({
        "user": "String",
        "contrincante": "String",
        "resultado": "String"
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    };
    
});

router.patch('/:userId', verify, async (req, res) => {
    const decoded = jwt.decode(req.header('auth-token'), process.env.SECRET_TOKEN);
    console.log(decoded._id)
    try {
        const updatedUser = await Match.updateOne(
            {contrincante: "2"},
            {$set: {
                user: decoded._id,
                contrincante: req.body.contrincante,
                resultado: req.body.resultado
            } }
        );
        res.json(updatedUser);
    }catch (err){
        res.json({message: err});
    }
});

module.exports = router;