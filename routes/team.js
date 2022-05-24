const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Team = require('../models/Team')
const jwt = require('jsonwebtoken');
const Player = require('../models/Player')


router.get('/', verify, async (req, res) => {
    const decoded = jwt.decode(req.header('Authorization'), process.env.SECRET_TOKEN);
    try {
        const team = await Team.find();
        res.json(team);
    }catch (err) {
        res.json({message:err});
    }
});

router.get('/getTeamPerToken/', async (req, res) => {
    const decoded = jwt.decode(req.header('Authorization'), process.env.SECRET_TOKEN);
    try {
        const team = await Team.find({user: decoded._id});
        console.log(team);
        res.json(team);
    }catch (err) {
        res.json({message:err});
    }
});

router.get('/getTeamPerId/:teamId', verify, async (req, res) => {
    console.log(req.header("authorization"))
    try {
        const team = await Team.findOne({_id: req.params.teamId});
        console.log(team);
        res.json(team);
    }catch (err) {
        res.json({message:err});
    }
});

router.get('/getPlayersPerTeam/:teamId', verify, async (req, res) => {
    try {
        const players = await Player.find({team: req.params.teamId});
        res.json(players);
    }catch (err) {
        res.json({message:err});
    }
});

router.post("/", verify, async (req, res) => {
    const decoded = jwt.decode(req.header('Authorization'), process.env.SECRET_TOKEN);
    console.log(req.body);
    const post = new Team({
        name: req.body.name,
        user: decoded._id
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    }; 
});

router.delete("/:teamId", verify, async (req, res) =>{
    try {
        const removeTeam = await Team.deleteOne({_id: req.params.teamId});
        const removePlayer = await Player.deleteMany({team: req.params.teamId});
        response = {removeTeam, removePlayer}
        res.json(response);
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router;