const chats = [];
const allUsers = [];

function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.length <= 20 &&username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function isValidMessage(message) {
    let isValid = true;
    isValid = isValid && message.trim();
    isValid = isValid && message.length > 0 && message.match(/^[A-Za-z0-9_ ]+$/);
    return isValid;
}

function sendNewMessage({ username, message, timestamp }) {
    const time = new Date(timestamp);
    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, '0');
    const day = String(time.getDate()).padStart(2, '0');
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    goodTime = (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds)
    chats.push({ username: username, message: message, timestamp: goodTime })
}

function deleteUser(username){
    allUsers.forEach((user, index) => {
        if (user === username) {
            allUsers.splice(index, 1);
        }
    });
}
function addNewUser(username){
    if(!allUsers.includes(username)){
        allUsers.push(username);
    }
}

module.exports = {
    chats,
    allUsers,
    isValidUsername,
    isValidMessage,
    sendNewMessage,
    deleteUser,
    addNewUser
}