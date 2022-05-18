const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Exercise = require('../models/Exercise');
const Comment = require('../models/Comment');
const Value = require('../models/Value');
const jwt = require('jsonwebtoken');

router.get('/getAllExercisePerUser/', verify, async (req, res) => {
    const decoded = jwt.decode(req.header('auth-token'), process.env.SECRET_TOKEN);
    try {
        const exercises = await Exercise.find({ user: decoded._id });
        console.log(exercises);
        res.json(exercises);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/getExercisePerId/:exerciseId', verify, async (req, res) => {
    try {
        const exercise = await Exercise.findOne({ _id: req.params.exerciseId });
        console.log(exercise);
        res.json(exercise);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/getCommentsPerExercise/:exerciseId', verify, async (req, res) => {
    try {
        const comments = await Comment.find({ _id: req.params.exerciseId });
        console.log(comments);
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/getAverageValueExercise/:exerciseId', verify, async (req, res) => {
    try {
        const value = await Value.find({ _id: req.params.exerciseId });
        const averageValue = value.filter((acc, cur) => {
            acc + cur;
        })
        res.json(averageValue / averageValue.length);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', verify, async (req, res) => {
    const decoded = jwt.decode(req.header('auth-token'), process.env.SECRET_TOKEN);
    console.log(req.body);
    const post = new Exercise({
        user: decoded._id,
        title: req.body.title,
        imageUrl: req.body.image,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    };
});

router.delete('/:exerciseId', verify, async (req, res) => {
    try {
        const removeExercise = await Exercise.deleteOne({ _id: req.params.exerciseId });
        const removeValue = await Value.deleteMany({ exercise: req.params.exerciseId });
        const removeComment = await Comment.deleteMany({exercise: req.params.exerciseId})
        res.json("ok");
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;