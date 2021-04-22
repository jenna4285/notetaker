const notes = require('./db/db.json');

// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = 3000;
// process.env.PORT || 

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// get and post routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '.public/index.html'));
});

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// Displays all notes
app.get('/api/notes', (req, res) => res.json(notes));

// Displays a single note, or returns false
// app.get('/api/notes/:notes', (req, res) => {
//   const chosen = req.params.notes;

//   console.log(notes);

//   /* Check each note routeName and see if the same as "chosen"
//    If the statement is true, send the note back as JSON,
//    otherwise tell the user no note was found */

//   for (let i = 0; i < notes.length; i++) {
//     if (chosen === notes[i].routeName) {
//       return res.json(notes[i]);
//     }
//   }

//   return res.json(false);
// });

app.post('/api/notes', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newNotes = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNote.routeName = newNote.name.replace(/\s+/g, '').toLowerCase();
    console.log(newNotes);
  
    newNotes.push(notes);
    res.json(notes);
  });

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));