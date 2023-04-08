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
  users: {
    1: {
      id: 1,
      email: '1@1',
      password: '123',
    },
    2: {
      id: 2,
      email: '2@2',
      password: '123',
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

// NOTES RENDERING ROUTES - INTERACTIONS WITH THE USER
// NOTES (LIST, NEW, SHOW)
// NOTES LIST
app.get('/notes', (req, res) => {
  // populate template variables
  const templateVars = {
    notes: db.notes,
  };

  // render template with variables
  res.render('notes-list', templateVars);
});

// NOTES NEW
app.get('/notes/new', (req, res) => {
  // render template
  res.render('notes-new');
});

// NOTES SHOW
app.get('/notes/:id', (req, res) => {
  // Refer to the note and validate it exists
  const note = db.notes[req.params.id];
  if (!note) {
    res.status(404).send('Note not found');
  }

  // populate template variables and render
  const templateVars = { note };
  res.render('notes-show', templateVars);
});

// AUTH RENDERING ROUTES - INTERACTING WITH THE USER
// AUTH (REGISTER, LOGIN)
app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

// AUTH REST API
// AUTH (REGISTER, LOGIN, LOGOUT)
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  const id = Math.floor(Math.random() * 100);

  db.users[id] = {
    id,
    email,
    password,
  };

  console.log(db.users);

  res.redirect('/login');
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  let user = null;

  for (const id in db.users) {
    if (db.users[id].email === email) {
      user = db.users[id];
    }
  }

  if (!user) {
    return res.status(400).send('Email not found');
  }

  if (user.password !== password) {
    return res.status(400).send('Passwords do not match');
  }

  res.redirect('/notes');
});

// REST API CRUD NOTES - NOT INTERACTING WITH THE USER, JUST DATA HANDLERS
// CREATE NOTE API - POST
app.post('/api/notes', (req, res) => {
  // body properties validation
  const { content } = req.body;
  if (!content) {
    return res.status(400).send('Provide content to create a note');
  }

  // creates an id and stores new note object in database
  const id = Math.floor(Math.random() * 100);
  db.notes[id] = {
    id,
    content,
  };

  // print database to see results
  console.log(db.notes);

  // redirect to main notes page to see new created note
  res.redirect('/notes');
});

// READ ALL NOTES API - GET
app.get('/api/notes', (req, res) => {
  // all notes in json
  res.send(db.notes);
});

// READ ONE NOTE API - GET
app.get('/api/notes/:id', (req, res) => {
  // Refer to the note and validate it exists
  const note = db.notes[req.params.id];
  if (!note) {
    res.status(404).send('Note not found');
  }

  // one note in json
  res.send(note);
});

// UPDATE NOTE API - POST/PUT
app.post('/api/notes/:id/edit', (req, res) => {
  // body properties validation
  const { content } = req.body;
  if (!content) {
    return res.status(400).send('Provide content to create a note');
  }

  // Refer to the note and validate it exists
  const note = db.notes[req.params.id];
  if (!note) {
    res.status(404).send('Note not found');
  }

  // after validating all steps, update the notes content
  db.notes[req.params.id].content = content;

  // print database to see results
  console.log(db.notes);

  // redirect to main notes page
  res.redirect('/notes');
});

// DELETE NOTE API - POST/DELETE
app.post('/api/notes/:id/delete', (req, res) => {
  // Refer to the note and validate it exists
  const note = db.notes[req.params.id];
  if (!note) {
    res.status(404).send('Note not found');
  }

  // after validating all steps, delete the note
  delete db.notes[req.params.id];

  // print database to see results
  console.log(db.notes);

  res.redirect('/notes');
});

app.use((req, res) => {
  res.status(404).send('Not found!');
});

// ------------------ LISTENER
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
