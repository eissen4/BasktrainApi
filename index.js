const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const matchRoute = require('./routes/match')
const statPlayerMatchRoute = require('./routes/statPlayerMatch')
const teamRoute = require('./routes/team')
const playerRoute = require('./routes/player')
const exerciseRoute = require('./routes/exercise')
const commentRoute = require('./routes/comment')
const valueRoute = require('./routes/value')
const upload = require('./routes/file')

app.use(express.json());
app.use('/', authRoute)
app.use('/uploads', express.static('uploads'))
app.use('/users', usersRoute)
app.use('/match', matchRoute)
app.use('/team', teamRoute)
app.use('/player', playerRoute)
app.use('/statPlayerMatch', statPlayerMatchRoute)
app.use('/exercise', exerciseRoute) 
app.use('/comment', commentRoute) 
app.use('/value', valueRoute) 
app.use('/upload', upload)

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("Connected to DB");
});

app.listen(3000, () => console.log('Server running on: http://localhost:3000/'))