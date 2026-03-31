const datas = require("./data");

function addNewWord(username){
    datas.words[username] = "";
}

function updateWord(username,newword){
    datas.words[username] = newword;
}

function getWord(username){
    return datas.words[username] || "";
}

const wordModel = {
    addNewWord,
    updateWord,
    getWord,
}
module.exports = wordModel;