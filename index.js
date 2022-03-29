const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

const postsRoute = require('./routes/posts')
const usersRoute = require('./routes/users')


app.use('/posts', postsRoute)
app.use('/users', usersRoute)
//ROUTES
app.get('/', (req, res) => {
    res.send('Home');
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("Connected to DB");
});

app.listen(3000, () => console.log('Server running on: http://localhost:3000/'))