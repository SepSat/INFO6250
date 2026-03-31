const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

// Session
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});

app.post('/api/session', (req, res) => {
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
    users.addNewUser(username);

    res.json({ username });
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (sid) {
        res.clearCookie('sid');
    }

    if (username) {
        sessions.deleteSession(sid);
    }

    users.deleteUser(username);

    res.json({ wasLoggedIn: !!username });
});

//Chat
app.get('/api/chat', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const allMessage = users.chats || "";
    const userList = users.allUsers;

    res.json({ userList, chats: allMessage });
});

app.post('/api/chat', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    //change
    const timestamp = Date.now();
    const { message } = req.body;

    if (!message && message !== '') {
        res.status(400).json({ error: 'required-message' });
        return;
    }

    if (!users.isValidMessage(message)) {
        res.status(400).json({ error: 'invalid-message' });
        return;
    }

    users.sendNewMessage({ username, message, timestamp });
    const userList = users.allUsers;

    res.json({ userList, chats: users.chats });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));