// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

var data = fs.readFileSync("./db/db.json");
var notes = JSON.parse(data);

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '.public/index.html'));
});

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));

app.delete('/api/notes/:id', (req, res) => {
  const chosen = req.params.id;

  notes = notes.filter(item => item.id != chosen);
  
  fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
    if (err) {
      console.log(err);
    } 
    console.log("success");
  })
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNotes = req.body;
    newNotes.id = uuidv4();
    console.log(newNotes);
  
    notes.push(newNotes);
    fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
      if (err) {
        console.log(err);
      } 
      console.log("success");
    })
    res.json(notes);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));