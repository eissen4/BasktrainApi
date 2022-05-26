const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');
const Player = require('../models/Player');
const StatPlayerMatch = require('../models/StatPlayerMatch');
const Match = require('../models/Match');

router.get('/token/:playerId', verify, async (req, res) => {
    try {
        const player = await Player.find({_id: req.params.playerId});
        res.json(player);
    }catch (err) {
        res.json({message:err});
    }
});

router.get('/getAllMatchesFromPlayer/:playerId', verify, async (req,res) =>{
    try {
        const matches = await StatPlayerMatch.find({match: req.params.playerId});
        console.log(matches)
        const matches2 = matches.map(match => Match.find({_id: match.match}) )
        console.log(matches2)
        res.json(matches2)
    } catch (err) {
        res.json({message: err});
    }
});

router.post("/", verify, async (req, res) => {
    console.log(req.body)
    const post = new Player({
        name: req.body.name,
        team: req.body.team,
        height: req.body.height,
        weight: req.body.weight,
        image: req.body.image
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    }; 
});

router.delete("/:playerId", verify, async (req, res) =>{
    try {
        const removePlayer = await Player.deleteOne({_id: req.params.playerId});
        res.json(removePlayer);
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router;