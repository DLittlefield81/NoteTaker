const express = require('express');
const notesRouter = require('./notes.js');
const app = express();


// ROUTES
app.use('/notes', notesRouter);



module.exports = app;