// DEV MODE  = npm run dev 
// PROD MODE = npm start 

// REQUIREMENTS
const express = require('express');
const moment = require('moment');
const path = require('path');
const api = require('./routes/index.js');

const app = express();

// PORT NUMBER
const PORT = process.env.PORT || 3001;


// LOG ACTIONS TO CONSOLE
const logger = (req, res, next) => {
    console.log(`${moment().format()} - - ${req.protocol}://${req.get('host')}${req.originalUrl} `); //
    next();
};


// //SETS ERROR CODE
// app.use((req, res, next) => {
//     res.status(404).send("YOUR PRINCESS IS IN ANOTHER CASTLE...༼ つ ◕_◕ ༽つ");
// })


// MIDDLEWARE
// USE LOGGER 
app.use(logger);
// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));
//URL ROUTING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// ROUTES
// TO INDEX
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
// TO NOTES
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);
// TO WILDCARD - ERROR HANDLER
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/404.html'))
);

// SHOW LISTENING PORT ON SERVER CONSOLE
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));