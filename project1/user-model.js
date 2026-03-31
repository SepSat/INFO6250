"use strict";
const datas = require("./data");
const crypto = require("crypto");

function createSID(){
    return crypto.randomUUID();
};

function loginChecker(sid){
    return !!datas.sessions[sid];
};

function isExistingUser(username){
    return !!datas.users[username];
};

function addNewUser(username){
    datas.users[username] = username;
};

function storeSID(sid,username){
    datas.sessions[sid] = username;
};

function getName(sid){
    return datas.sessions[sid];
};

const userModel = {
    createSID,
    loginChecker,
    addNewUser,
    storeSID,
    isExistingUser,
    getName,
};

module.exports = userModel;