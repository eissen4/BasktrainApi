const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');
const StatPlayerMatch = require('../models/StatPlayerMatch');
const Match = require('../models/Match');

router.get('/:statPlayerMatchId', verify, async (req, res) => {
    try {
        const statPlayerMatch = await StatPlayerMatch.find({_id: req.params.statPlayerMatchId});
        res.json(statPlayerMatch);
    }catch (err) {
        res.json({message:err});
    }
});

router.get('/:statPlayerMatchId', verify, async (req, res) => {
    try {
        const statPlayerMatch = await StatPlayerMatch.find({_id: req.params.statPlayerMatchId});
        res.json(statPlayerMatch);
    }catch (err) {
        res.json({message:err});
    }
});

router.get('/getAllStatsFromPlayer/:playerId', verify, async (req, res) => {
    try {
        const statsPlayer = await StatPlayerMatch.find({player: req.params.playerId});
        res.json(statsPlayer);
    }catch (err) {
        res.json({message:err});
    }
});

router.get('/getAllStatsFromMatch/:matchId', verify, async (req, res) => {
    try {
        const statsPlayer = await StatPlayerMatch.find({match: req.params.matchId});
        console.log(statsPlayer);
        res.json(statsPlayer);
    }catch (err) {
        res.json({message:err});
    }
});

router.post("/", verify, async (req, res) => {
    console.log(req.body.playerName)
    if(await StatPlayerMatch.exists({player: req.body.player, match: req.body.match})) 
        return res.json("Este jugador ya tiene estadísticas en este partido")
    const post = new StatPlayerMatch({
        player: req.body.player,
        playerName: req.body.playerName,
        match: req.body.match,
        opponent: req.body.opponent,
        points: req.body.points,
        rebounds: req.body.rebounds,
        assists: req.body.assists
    });
    try {
        const savedPost = await post.save();
        console.log(savedPost);
        res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    }; 
});

router.delete("/:statPlayerMatchId", verify, async (req, res) =>{
    try {
        const removeStatPlayerMatch = await StatPlayerMatch.deleteOne({_id: req.params.statPlayerMatchId});
        res.json(removeStatPlayerMatch);
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router;