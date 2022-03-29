const express = require('express');

const router = express.Router();

const Posts = require('../models/Posts')

router.get('/', (req, res) => {
    res.send('Posts');
})

router.post("/", (req, res) => {
    console.log(req.body);
    const post = new Posts({
        title: req.body.title,
        description: req.body.description
    });

    post.save();
});

module.exports = router;