const datas = require("./data");
const crypto = require("crypto");

function creatSID(){
    return crypto.randomUUID();
}

function loginChecker(sid){
    return !!datas.sessions[sid];
};
function ifNewUser(username){
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
    creatSID,
    loginChecker,
    addNewUser,
    storeSID,
    ifNewUser,
    getName,
};

module.exports = userModel;