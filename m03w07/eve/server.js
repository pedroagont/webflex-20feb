// ------------------ REQUIREMENTS
const express = require('express');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
// var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

// Simulates a DB
const db = {
  notes: {
    1: {
      id: 1,
      content: 'Learn HTML, CSS, JS',
    },
    2: {
      id: 2,
      content: 'Implement a CRUD in Express',
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

// ------------------ SETUP / MIDDLEWARE
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

// cookie-parser parses a cookies object in the request object (req.cookies)
// app.use(cookieParser());

// cookie-session parses a session object in the request object (req.session)
app.use(
  cookieSession({
    name: 'session',
    keys: ['secret', 'keys'],
    // Cookie Options
    // maxAge: 24 * 60 * 60 * 1000, // 24 hours
    maxAge: 10 * 60 * 1000, // 10 min
  })
);

// ------------------ ROUTES/ENDPOINTS
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test/:id', (req, res) => {
  console.log('req.params', req.params); // url.com/users/123/products/456
  console.log('req.query', req.query); // url.com/cities/cancun?min=100&max=300
  res.send('Test route!');
});

// NOTES RENDERING ROUTES - INTERACTIONS WITH THE USER
// NOTES (LIST, NEW, SHOW)
// NOTES LIST
app.get('/notes', (req, res) => {
  // cookie/ user logged in validation
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send('User is not logged in');
  }

  // populate template variables
  const templateVars = {
    notes: db.notes,
  };

  // render template with variables
  res.render('notes-list', templateVars);
});

// NOTES NEW
app.get('/notes/new', (req, res) => {
  // cookie/ user logged in validation
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send('User is not logged in');
  }

  // render template
  res.render('notes-new');
});

// NOTES SHOW
app.get('/notes/:id', (req, res) => {
  // cookie/ user logged in validation
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send('User is not logged in');
  }

  // Refer to the note and validate it exists
  const note = db.notes[req.params.id];
  if (!note) {
    res.status(404).send('Note not found');
  }

  // populate template variables and render
  const templateVars = { note };
  res.render('notes-show', templateVars);
});

// AUTH RENDERING ROUTES - INTERACTIONS WITH THE USER
// AUTH REGISTER
app.get('/register', (req, res) => {
  // render register form
  res.render('register');
});

// AUTH LOGIN
app.get('/login', (req, res) => {
  // render login form
  res.render('login');
});

// REST API CRUD NOTES - NOT INTERACTING WITH THE USER, JUST DATA HANDLERS
// CREATE NOTE API - POST
app.post('/api/notes', (req, res) => {
  // cookie/ user logged in validation
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send('User is not logged in');
  }

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
  // cookie/ user logged in validation
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send('User is not logged in');
  }

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
  // cookie/ user logged in validation
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send('User is not logged in');
  }

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

// REST API AUTH
// AUTH REGISTER API
app.post('/api/register', (req, res) => {
  // body properties validation
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Provide email and password to register');
  }

  // Create id and hash pasword
  const id = Math.floor(Math.random() * 100);
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Store new user object in database with new id
  db.users[id] = {
    email,
    password: hashedPassword,
  };

  // print db to see results
  console.log(db.users);
  res.redirect('/login');
});

// AUTH LOGIN API
app.post('/api/login', (req, res) => {
  // body properties validation
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Provide email and password to register');
  }

  // validates user exists in database
  let user = null;
  for (const key in db.users) {
    if (db.users[key].email === email) {
      user = db.users[key];
    }
  }
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  // password validation
  //   const passwordsMatch = user.password === password;
  const passwordsMatch = bcrypt.compareSync(password, user.password);
  if (!passwordsMatch) {
    return res.status(401).send('Invalid credentials');
  }

  // after all validation steps we set the cookie
  //   res.cookie('user_id', email);
  req.session.user_id = email;

  res.redirect('/notes');
});

// AUTH LOGOUT API
app.post('/api/logout', (req, res) => {
  // remove cookie to logout current user
  //   res.clearCookie('user_id');
  req.session = null;

  res.redirect('/login');
});

// Catch all route
app.use((req, res) => {
  res.status(404).send('Not found!');
});

// ------------------ LISTENER
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
