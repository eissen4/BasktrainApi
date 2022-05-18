const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Comment = require('../models/Comment');

router.post('/', verify, async (req, res) => {
    const post = new Comment({
        user: req.body.user,
        exercise: req.body.exercise,
        comment: req.body.comment
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    };
});

router.delete('/:commentId', verify, async (req, res) => {
    try {
        const removeComment = await Comment.deleteOne({ _id: req.params.commentId });
        res.json("ok");
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;