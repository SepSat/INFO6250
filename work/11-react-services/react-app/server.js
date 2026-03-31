import express from 'express';
import cookieParser from 'cookie-parser';

import sessions from './sessions.js';
import users from './users.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json()); // Parses requests with json content bodies

// Sessions
// Check for existing session (used on page load)
app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

// Create a new session (login)
app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValidUsername(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);

  res.cookie('sid', sid);
  users.wordFor[username] ||= "";

  res.json({ username });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    sessions.deleteSession(sid);
  }

  res.json({ wasLoggedIn: !!username });
});

// Stored Word

app.get('/api/v1/word', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const storedWord = users.wordFor[username] || "";

  res.json({ username, storedWord });
});

app.put('/api/v1/word', (req, res) => {

  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { word } = req.body;

  if(!word || word === '') {
    res.status(400).json({ error: 'required-word' });
    return;
  }

  if(!users.isValidWord(word)) {
    res.status(400).json({ error: 'invalid-word' });
    return;
  }

  users.wordFor[username] = word;

  res.json({ username, storedWord: word });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));