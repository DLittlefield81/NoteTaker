// DEV MODE  = npm run dev 
// PROD MODE = npm start 

// REQUIREMENTS
const express = require('express');
const path = require('path');
const notesDB = require('./db/db.json');
const app = express();
const moment = require('moment');
const fs = require('fs');
const logger = (req, res, next) => {
    console.log(`${req.protocol}:// ${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
};

 // API'S
 // SETS UP API FOR NOTES
 app.get('/api/notes', (req, res) => res.json(notesDB));


// //SETS ERROR CODE
// app.use((req, res, next) => {
//     res.status(404).send("YOUR PRINCESS IS IN ANOTHER CASTLE...༼ つ ◕_◕ ༽つ");
// })


// PORT CONFIGURATION
// PORT NUMBER
const port = process.env.PORT || 3001;
// SHOW LISTENING PORT ON SERVER CONSOLE
app.listen(port, () => console.log(`Listening on port ${port}`));




// MIDDLEWARE
// USE LOGGER 
app.use(logger);
// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));
//URL ROUTING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





// ROUTES
// TO INDEX
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);
// TO NOTES
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);
// TO WILDCARD - ERROR HANDLER
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/404.html'))
);

// POST request to add a review
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            note_id: uuid()
        };

        // Obtain existing reviews
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);

                // Add a new review
                parsedNotes.push(newNote);

                // Write updated reviews back to the file
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated reviews!')
                );
            }
        })
    }
});

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