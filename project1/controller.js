"use strict";
const userModel = require("./user-model");
const wordmodel = require('./word-model');
const viewer = require("./viewers");
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if (userModel.loginChecker(sid)) {
        const username = userModel.getName(sid);
        const wordlist = wordmodel.getWordList();
        const isgamming = wordmodel.getState(username);
        const guessingtimes = wordmodel.getGuessTimes(username);
        const guessinghistory = wordmodel.getGuessingHistory(username);
        res.send(viewer.guessPage(username, wordlist, isgamming, guessingtimes, guessinghistory));
    }
    else {
        res.send(viewer.logInPage("please login!"));
    }
});
router.post('/guess', (req, res) => {
    const newword = req.body.newword;
    const sessionID = req.cookies.sid;
    const username = userModel.getName(sessionID);
    if (!wordmodel.checkWord(newword, username)) {
        wordmodel.setGuessingHistory(username, newword, "invalid guess");
    }else{
        const result = wordmodel.compareWord(username, newword);
        if (result !== true) {
            wordmodel.setGuessingHistory(username, newword, result + "same letter");
        }else{
            wordmodel.setGuessingHistory(username, newword, "win");
        }
    }
    res.redirect('/');
});

router.post('/newgame', (req, res) => {
    const sessionID = req.cookies.sid;
    const username = userModel.getName(sessionID);
    wordmodel.startNewGame(username);
    res.redirect('/');
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    if (!username) {
        return res.send(viewer.logInPage("Oops! It looks like you forgot to enter a username. Please try again."));
    }
    if (username === "dog") {
        return res.send(viewer.logInPage("Oops! It looks like 'dog' is not a valid username. Please choose a different one."));
    }
    if (!username.match(/^[a-zA-Z0-9]{6,10}$/)) {
        return res.send(viewer.logInPage("Oops! Your username is too long, too short, or contains invalid characters. Please choose a valid one."));
    }
    const sessionID = userModel.createSID();
    res.cookie('sid', sessionID);

    if (!userModel.isExistingUser(username)) {
        userModel.addNewUser(username);
        wordmodel.addGuessingHistory(username);
    }
    userModel.storeSID(sessionID, username);
    res.redirect('/');
});
router.post('/', (req, res) => {
    const oidSessionID = req.cookies.sid;
    if (oidSessionID && userModel.sessions && userModel.sessions[oidSessionID]) {
        delete userModel.sessions[oidSessionID]
    }
    res.clearCookie('sid');
    res.redirect('/');
});
module.exports = router;