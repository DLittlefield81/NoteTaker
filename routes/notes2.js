const notes = require('express').Router();
const db = require('./db/db.json');
const uuid = require('./helpers/uuid');
console.log(uuid);

const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');


// API'S
// GETS ALL NOTES FROM DB
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});



notes.get('/:id', (req, res) => {
    res.json('../db/db.json'.filter(db => db.id === parseInt(req.params.id)))
    const found = notes.some(note => note)
    res.json(notesDB.filter(note => note.id === parseInt(req.params.id)));
    if (found) {
        res.json(notes.filter(note => note.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `No note found with the id of ${req.params.id}` })
    }
});
//POST request to add a review
notes.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            id: uuid(),
            title,
            text

        };

        // Obtain existing notes
        fs.readFile('../db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);

                // Add a new review
                parsedNotes.push(newNote);

                // Write updated reviews back to the file
                fs.writeFile(
                    '../db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated database!')
                );
            }
        })
    }
});
















// DELETE Route for a specific tip
// db.delete('/api/notes/:id', (req, res) => {
//     const noteId = req.params.id;
//     readFromFile(db)
//         .then((data) => JSON.parse(data))
//         .then((json) => {
//             // Make a new array of all tips except the one with the ID provided in the URL
//             const result = json.filter((note) => db.id !== noteId);

//             // Save that array to the filesystem
//             writeToFile(db, result);

//             // Respond to the DELETE request
//             res.json(`Item ${noteId} has been deleted 🗑️`);
//         });
// });





module.exports = notes;