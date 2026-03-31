"use strict";
const datas = require("./data");
const wordslist = require("./words");

/*add new user's info*/
function addGuessingHistory(username) {
    datas.guessinghistory[username] = [];
    startNewGame(username);
};

/*play a new game*/
function deleteUserPlayingGameInfo(username) {
    if (username in datas.guessinginfo) {
        delete datas.guessinginfo[username];
    }
};
function deleteGuessingHistory(username){
    if (username in datas.guessinghistory) {
        datas.guessinghistory[username] = [];
    }
};

function createWordIndex() {
    const wordsNum = wordslist.length;
    const secretwordindex = Math.floor(Math.random() * wordsNum);
    return secretwordindex;
};

function startNewGame(username) {
    deleteUserPlayingGameInfo(username);
    deleteGuessingHistory(username);
    const index = createWordIndex();
    const newinfo = { 'index': index, 'times': 0, 'state': true }
    datas.guessinginfo[username] = (newinfo);
    forMe(username)
};

/*about guessing history now*/
function getTimeStamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
};

function getGuessingHistory(username) {
    return datas.guessinghistory[username];
};

function setGuessingHistory(username, inputword, feedback) {
    const timestamp = getTimeStamp();
    if (!datas.guessinghistory[username]){
        addGuessingHistory(username);
    }
    datas.guessinghistory[username].push({ "inputword": inputword, "feedback": feedback, "timestamp": timestamp })
};

//gaming
function checkWord(word, username) {
    const lowerword = word.toLowerCase();
    const lowerwordlist = wordslist.map(word => word.toLowerCase());
    const history = datas.guessinghistory[username];
    if(!lowerwordlist.includes(lowerword)){
        return false;
    }
    if (history && history.some(item => item.inputword === lowerword)) {
        return false;
    }
    return true;
};

function compareWord(username, inputword) {
    setGuessTimes(username);
    const index = getIndex(username);
    const secretword = getSecretWord(index);
    const lowersecretword = secretword.toLowerCase();
    const lowerword = inputword.toLowerCase();
    const secretwordletter = {};
    if (lowersecretword === lowerword) {
        setWin(username);
        return true
    }
    for (let letter of lowersecretword) {
        if (secretwordletter[letter]) {
            secretwordletter[letter] += 1;
        } else {
            secretwordletter[letter] = 1;
        }
    }
    let commonNumber = 0;
    for (let letter of lowerword) {
        if (secretwordletter[letter] && secretwordletter[letter] > 0) {
            commonNumber += 1;
            secretwordletter[letter] -= 1;
        }
    }
    return commonNumber;
};

function setGuessTimes(username) {
    datas.guessinginfo[username].times += 1;
};

function setWin(username) {
    datas.guessinginfo[username].state = false;
};
function getGuessTimes(username) {
    return datas.guessinginfo[username].times;
};

function getState(username) {
    return datas.guessinginfo[username].state;
};

function getIndex(username) {
    return datas.guessinginfo[username].index;
};

function getWordList() {
    return wordslist;
};

function getSecretWord(wordIndex) {
    return wordslist[wordIndex];
};

function forMe(username) {
    const index = getIndex(username);
    const secretWord = getSecretWord(index);
    console.log("user: " + username + "Secret Word " + secretWord);
};
const wordmodel = {
    addGuessingHistory,
    startNewGame,
    getGuessingHistory,
    setGuessingHistory,
    checkWord,
    compareWord,
    getGuessTimes,
    getState,
    getWordList
}
module.exports = wordmodel;