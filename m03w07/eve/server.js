// ------------------ REQUIREMENTS
const express = require('express');
const morgan = require('morgan');

// Simulates a DB
const db = {
  notes: {
    1: {
      id: 1,
      content: 'Learn Server Side Rendering',
    },
    2: {
      id: 2,
      content: 'Implement a CRUD REST API in Express',
    },
    3: {
      id: 3,
      content: 'Have fun!',
    },
  },
};

// ------------------ SETUP & MIDDLEWARE
const app = express();
const port = 3000;

// Custom middleware
// app.use((req, res, next) => {
//   console.log(req.url, req.method);
//   next();
// });

// external middleware like morgan to log every request to our server
app.use(morgan('dev'));

// sets the template engine as html with embbedded js (views/*.ejs)
app.set('view engine', 'ejs');

// allow our server to parse/decode data through the use of a body (req.body)
app.use(express.urlencoded({ extended: false }));

// ------------------ ROUTES/ENDPOINTS
app.get('/', (req, res) => {
  res.send('Hello World! <a href="/notes">Go to notes app</a>');
});

app.get('/test/:id', (req, res) => {
  console.log('req.params', req.params);
  console.log('req.query', req.query);
  res.send('Test route!');
});

// RENDERING ROUTES
// NOTES LIST
app.get('/notes', (req, res) => {
  const templateVars = {
    notes: db.notes,
  };
  res.render('notes-list', templateVars);
});

// NOTES NEW
app.get('/notes/new', (req, res) => {
  res.render('notes-new');
});

// NOTES SHOW
app.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  const note = db.notes[id];
  if (!note) {
    res.status(404).send('Note not found');
  }

  const templateVars = { note };

  res.render('notes-show', templateVars);
});

// CRUD API NOTES
// CREATE - POST
app.post('/api/notes', (req, res) => {
  const { content } = req.body;
  const id = Math.floor(Math.random() * 100);
  db.notes[id] = {
    id,
    content,
  };
  console.log(db.notes);

  res.redirect('/notes');
});

// READ ALL - GET
app.get('/api/notes', (req, res) => {
  res.send(db.notes);
});

// READ ONE - GET
app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  res.send(db.notes[id]);
});

// UPDATE - POST/PUT
app.post('/api/notes/:id/edit', (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  db.notes[id] = {
    id,
    content,
  };
  console.log(db.notes);

  res.redirect('/notes');
});

// DELETE - POST/DEL
app.post('/api/notes/:id/delete', (req, res) => {
  const { id } = req.params;
  delete db.notes[id];
  res.redirect('/notes');
});

app.use((req, res) => {
  res.status(404).send('Not found!');
});

// ------------------ LISTENER
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
