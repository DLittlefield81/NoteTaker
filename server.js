//npm run dev <----loads the server in dev mode
//npm start <----loads the server in prod mode

//setup sever instance
const express = require('express');
const path = require('path');
const notesDB = require('./db/db.json');
const app = express();
//setup port
const port = process.env.PORT || 3001;

//Show port that server started on
app.listen(port, () => console.log(`Listening on port ${port}`));
// Middleware to set static folder
app.use(express.static(path.join(__dirname, 'public')));

//setting up the api
app.get('/api/notes', (req, res) => res.json(notesDB));
//Homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);
//Main routes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))  
);
//WILDCARD
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/404.html')),
    //set error status
    res.status(404),
res.send('None shall pass')
);




// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left - hand column, plus empty fields to enter a new note title and the note’s text in the right - hand column
// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left - hand column with the other existing notes
// WHEN I click on an existing note in the list in the left - hand column
// THEN that note appears in the right - hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right - hand column