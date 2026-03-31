const userModel = require("./user-model");
const wordModel = require("./word-model");
const viewer = require("./viewer");
const express = require('express');

const router = express.Router();
router.get('/',(req,res) => {
    const sid = req.cookies.sid;
    if (userModel.loginChecker(sid)){
        const username = userModel.getName(sid);
        const word = wordModel.getWord(username);
        res.send(viewer.wordsPage(username,word));
    }
    else{
        res.send(viewer.logInPage());
    }
});
router.post('/login', (req,res) => {
    const username = req.body.username;
    if (!username){
        return res.status(400).send(viewer.errorPage("no username", 400));
    } 
    else if (username === "dog"){
        return res.status(403).send(viewer.errorPage("username not allowed", 403));
    }
    else if (!username.match(/^[a-zA-Z0-9]+$/)){
        return res.status(400).send(viewer.errorPage("invalid username", 400));
    }
    const sessionID = userModel.creatSID();
    res.cookie('sid', sessionID);
    
    if (userModel.ifNewUser(username)){
        userModel.addNewUser(username);
        wordModel.addNewWord(username);
    }
    userModel.storeSID(sessionID,username);
    
    res.redirect('/'); 
});
router.post('/logOut',(req,res) => {
    const oidSessionID = req.cookies.sid;
    if(oidSessionID && userModel.sessions && userModel.sessions[oidSessionID]){
        delete userModel.sessions[oidSessionID]
    }
    res.clearCookie('sid');
    res.redirect('/'); 
});
router.post('/changeword',(req,res) => {
    const sid = req.cookies.sid;
    const username = userModel.getName(sid);
    const newword = req.body.newword;
    wordModel.updateWord(username,newword);
    res.redirect('/'); 
});
module.exports = router;