import express from 'express';
import cookieParser from 'cookie-parser';

import sessions from './sessions.js';
import users from './users.js';
import game from './game.js';
import administrator from './administrator.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

// Sessions
// Check for existing session (used on page load)
app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

// Create a new session (login)
app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if (!users.isValidUsername(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);

  res.cookie('sid', sid);

  users.subscribes = users.subscribes || {};
  users.subscribes[username] = users.subscribes[username] || {};

  if (administrator.isValidAdministrator(username)) {
    const adminLevel = administrator.checkAdminLevel(username);
    res.json({ username, isAdministrator: true, adminLevel });
    return;
  }

  res.json({ username, isAdministrator: false, adminLevel: "" });
});

//logout
app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({ wasLoggedIn: !!username });
});

//user subscribe
app.get('/api/v1/subscribe', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const subscribes = Object.keys(users.subscribes[username]) || {};

  res.json({ subscribes });
});

app.put('/api/v1/subscribe', (req, res) => {

  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { subscribe } = req.body;

  users.subscribes[username][subscribe] = true;
  const subscribes = Object.keys(users.subscribes[username]) || {};

  res.json({ subscribes });
});

app.delete('/api/v1/subscribe', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { subscribe } = req.body;

  if (users.subscribes[username] && users.subscribes[username][subscribe]) {
    delete users.subscribes[username][subscribe];
  }
  const subscribes = Object.keys(users.subscribes[username]) || {};
  res.json({ subscribes });
});

// about game
// get game
app.get('/api/v1/game', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const games = game.games;
  const platforms = game.platforms;

  res.json({ games, platforms });
});

// add game
app.post('/api/v1/game', (req, res) => {
  const { newGame } = req.body;
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  if (!game.isValidName(newGame.name)) {
    res.status(400).json({ error: 'required-gamename' });
    return;
  }

  if (!game.isValidRating(newGame.rating)) {
    res.status(400).json({ error: 'required-rating' });
    return;
  }

  if (!game.isValidOverview(newGame.overview)) {
    res.status(400).json({ error: 'required-overview' });
    return;
  }


  if (!game.isValidGenre(newGame.genre)) {
    res.status(400).json({ error: 'required-genre' });
    return;
  }

  for (const platform of newGame.platforms) {
    if (!game.isValidPrice(platform.price)) {
      res.status(400).json({ error: 'required-price' });
      return;
    };

    if (!game.isValidSalesPrice(platform.price, platform.salesPrice)) {
      res.status(400).json({ error: 'required-salesprice' });
      return;
    };

    if (!game.isValidLowPrice(platform.price, platform.salesPrice, platform.lowPrice)) {
      res.status(400).json({ error: 'required-lowprice' });
      return;
    };

  }

  game.addNewGame(newGame);

  const games = game.games;
  const platforms = game.platforms;

  res.json({ games, platforms });
});

app.put('/api/v1/game', (req, res) => {
  const { changedGame } = req.body;
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  if (!game.isValidRating(changedGame.rating)) {
    res.status(400).json({ error: 'required-rating' });
    return;
  }

  if (!game.isValidOverview(changedGame.overview)) {
    res.status(400).json({ error: 'required-overview' });
    return;
  }

  for (const platform of changedGame.platforms) {
    if (!game.isValidPrice(platform.price)) {
      res.status(400).json({ error: 'required-price' });
      return;
    };

    if (!game.isValidSalesPrice(platform.price, platform.salesPrice)) {
      res.status(400).json({ error: 'required-salesprice' });
      return;
    };

    if (!game.isValidLowPrice(platform.price, platform.salesPrice, platform.lowPrice)) {
      res.status(400).json({ error: 'required-lowprice' });
      return;
    };

  }

  game.changeGame(changedGame);

  const games = game.games;
  const platforms = game.platforms;

  res.json({ games, platforms });
});

// delete game
app.delete('/api/v1/game', (req, res) => {
  const sid = req.cookies.sid;
  const { game } = req.body;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  if (game.gameName) {
    game.deleteGame(game.gameName);
  }

  //修改这个什么比较好？
  res.json({ wasLoggedIn: !!game });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));