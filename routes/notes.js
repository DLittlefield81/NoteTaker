const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

//GET ROUTE FOR RETRIEVING ALL NOTES
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET SPECIFIC NOTE
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.status(404).json(`There are currently no notes with the id: '${noteId}' on record.`);
            
        });
});

// DELETE SPECIFIC NOTE
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // FILTER THE ID OUT FOR DELETION
            const result = json.filter((note) => note.id !== noteId);

            // WRITE TO DB FILE
            writeToFile('./db/db.json', result);

            // CONFIRM DELETION
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});

// CREATE NEW NOTE
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            id: uuid(),
            title,
            text
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding Note');
    }
});

module.exports = notes;
