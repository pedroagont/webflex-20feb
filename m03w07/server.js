// ------------------ REQUIREMENTS
const express = require('express');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
// var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
const app = express();
const port = 3000;

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

// ------------------ MIDDLEWARE
// app.use((req, res, next) => {
//   console.log(req.url, req.method);
//   next();
// });
app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser());
app.use(
  cookieSession({
    name: 'session',
    keys: ['secret', 'keys'],
    // Cookie Options
    // maxAge: 24 * 60 * 60 * 1000, // 24 hours
    maxAge: 10 * 60 * 1000, // 24 hours
  })
);

// ------------------ ROUTES/ENDPOINTS
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test/:id', (req, res) => {
  console.log('req.params', req.params);
  console.log('req.query', req.query);
  res.send('Test route!');
});

// RENDERING ROUTES
// NOTES
// NOTES LIST
app.get('/notes', (req, res) => {
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send('User is not logged in');
  }

  const templateVars = {
    notes: db.notes,
  };
  res.render('notes-list', templateVars);
});

// NOTES NEW
app.get('/notes/new', (req, res) => {
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send('User is not logged in');
  }

  res.render('notes-new');
});

// NOTES SHOW
app.get('/notes/:id', (req, res) => {
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send('User is not logged in');
  }

  const { id } = req.params;
  const note = db.notes[id];
  if (!note) {
    res.status(404).send('Note not found');
  }

  const templateVars = { note };

  res.render('notes-show', templateVars);
});

// RENDERING ROUTES AUTH
// AUTH REGISTER
app.get('/register', (req, res) => {
  res.render('register');
});

// AUTH LOGIN
app.get('/login', (req, res) => {
  res.render('login');
});

// CRUD API NOTES
// CREATE - POST
app.post('/api/notes', (req, res) => {
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send('User is not logged in');
  }

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
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send('User is not logged in');
  }

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
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send('User is not logged in');
  }

  const { id } = req.params;
  delete db.notes[id];
  res.redirect('/notes');
});

// AUTH API
// AUTH REGISTER
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Provide email and password to register');
  }

  const id = Math.floor(Math.random() * 100);
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.users[id] = {
    email,
    password: hashedPassword,
  };
  console.log(db.users);
  res.redirect('/login');
});

// AUTH LOGIN
app.post('/api/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  let userObject = null;
  for (const key in db.users) {
    if (db.users[key].email === email) {
      userObject = db.users[key];
    }
  }

  if (!userObject) {
    return res.status(401).send('Invalid credentials');
  }

  //   const passwordsMatch = userObject.password === password;
  const passwordsMatch = bcrypt.compareSync(password, userObject.password);
  if (!passwordsMatch) {
    return res.status(401).send('Invalid credentials');
  }

  //   res.cookie('user_id', email);
  req.session.user_id = email;

  console.log(db.users);
  res.redirect('/notes');
});

// LOGOUT
app.post('/api/logout', (req, res) => {
  //   res.clearCookie('user_id');
  req.session = null;
  res.redirect('/login');
});

app.use((req, res) => {
  res.status(404).send('Not found!');
});

// ------------------ LISTENER
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
