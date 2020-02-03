const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

/* Environment variables */
require('dotenv').config();

/* Create express server on port x */
const app = express();
const port = process.env.port || 5000;

/* Middleware: Allows us to parse JSON through server */
app.use(express.json());

/* Find the URI containing token information for accessing our database */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection to MongoDB successfully established.");
});

/* API endpoints for connecting users */
const userRouter = require('./routes/users');
app.use('/users', userRouter);

/* Start server by running: nodemon server */
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
