const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Exercise = require('../models/Exercise');
const Comment = require('../models/Comment');
const Value = require('../models/Value');
const jwt = require('jsonwebtoken');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.imageUrl.toString().replace(/:/g, '-').replace(/\//g, '-')
        + (jwt.decode(req.header('Authorization'), process.env.SECRET_TOKEN))._id
        + file.originalname);
    }
});

// const upload = multer({dest: 'uploads/'});

const upload = multer({storage: storage}) 

router.get('/', verify, async (req, res) => {
    const decoded = jwt.decode(req.header('Authorization'), process.env.SECRET_TOKEN);
    try {
        const exercises = await Exercise.find({ user: decoded._id });
        console.log(exercises)
        res.json(exercises);
    } catch (err) {
        res.json({ message: err });
    }
});
router.get('/', verify, async (req, res) => {
    try {
        const exercise = await Exercise.find().populate('Value');
        res.json(exercise);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:exerciseId', verify, async (req, res) => {
    try {
        const exercise = await Exercise.findOne({ _id: req.params.exerciseId });
        res.json(exercise);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/getCommentsPerExercise/:exerciseId', verify, async (req, res) => {
    try {
        const comments = await Comment.find({ _id: req.params.exerciseId });
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

router.get('/getExerciseSearched/:names', verify, async (req, res) => {
    try {
        const exercises = await Exercise.find({ title: req.params.names });
        res.json(exercises);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', verify, upload.single("file"), async (req, res) => {
    console.log(req.file + " router");
    const decoded = jwt.decode(req.header('Authorization'), process.env.SECRET_TOKEN);
    const post = new Exercise({
        user: decoded._id,
        title: req.body.title,
        imageUrl: req.body.imageUrl.toString().replace(/:/g, '-').replace(/\//g, '-')
        + (jwt.decode(req.header('Authorization'), process.env.SECRET_TOKEN))._id
        + "a.jpg",
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        console.log(savedPost)
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
        res.json({removeExercise, removeValue, removeComment});
    } catch (err) {
        res.json({ message: err })
    }
})
module.exports = router;