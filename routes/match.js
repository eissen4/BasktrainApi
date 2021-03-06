const express = require('express');
const Match = require('../models/Match')
const Team = require('../models/Team')
const router = express.Router();
const verify = require('./verifyToken')
const jwt = require('jsonwebtoken');
const StatPlayerMatch = require('../models/StatPlayerMatch');

router.get('/', async (req, res) => {
    try {
        const match = await Match.find()
        console.log(match)
        res.json(match)
    }catch (err) {
        res.json({message:err});
    }
});

router.get('/getAllMatchesFromTeam/:teamId', verify, async (req, res) => {
    try {
        const match = await Match.find({team: req.params.teamId})
        console.log(match)
        res.json(match)
    }catch (err) {
        res.json({message:err});
    }
});

router.get('/getAllMatchesFromUser/', verify, async (req, res) => {
    const decoded = jwt.decode(req.header('Authorization'), process.env.SECRET_TOKEN);
    try {
        const match = await Match.find({user: decoded._id})
        res.json(match)
    }catch (err) {
        res.json({message:err});
    }
});

router.get('/getOneMatch/:matchId', verify, async (req, res) => {
    try {
        const match = await Match.findOne({_id: req.params.matchId});
        res.json(match);
    }catch (err) {
        res.json({message:err});
    }
});

router.get('/getAllStatsFromMatch/:matchId', verify, async (req, res) => {
    try {
        const stats = await StatPlayerMatch.find({match: req.params.matchId});

        res.json(stats);
    }catch (err) {
        res.json({message:err});
    }
});

router.post("/", async (req, res) => {
    console.log("entra")
    const decoded = jwt.decode(req.header('Authorization'), process.env.SECRET_TOKEN);
    const post = new Match({
        user: decoded._id,
        team: req.body.team,
        opponent: req.body.opponent,
        scoreOne: req.body.scoreOne,
        scoreTwo: req.body.scoreTwo,
        date: req.body.date
    });
    
    try {
        const savedPost = await post.save();
        console.log(savedPost)
        res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    };
});

router.delete("/:matchId", verify, async (req, res) =>{
    try {
        const removeMatch = await Match.deleteOne({_id: req.params.matchId});
        const removeStats = await StatPlayerMatch.deleteMany({match: req.params.matchId});
        response = {removeMatch, removeStats}
        console.log(response)
        res.json(response);
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router;