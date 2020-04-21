const express = require('express');
const mongoose = require('mongoose');

/* Environment variables */
require('dotenv').config();

/* Create express server on port x */
const app = express();
const port = process.env.port || 5000;

/* Middleware: Allows us to parse JSON through server */
app.use(express.json());
app.use(express.static("manager_portal"));

/* Find the URI containing token information for accessing our database */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection to MongoDB successfully established.");
});

/* API endpoints for connecting users */
const userRouter = require('./routes/users');
const foodRouter = require('./routes/foods');
app.use('/users', userRouter);
app.use('/foods', foodRouter);

/* Start server by running: nodemon server */
var server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = server;
