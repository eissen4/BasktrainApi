const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')

app.use(express.json());
app.use('/', authRoute)
app.use('/users', usersRoute)

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("Connected to DB");
});

app.listen(3000, () => console.log('Server running on: http://localhost:3000/'))