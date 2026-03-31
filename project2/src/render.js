function render({ state, appEl }) {
    const html = `
    <main class="">
        ${loginHtml(state)}
        ${chatTab(state)}
    </main>
    `;
    appEl.innerHTML = html;
    if(state.isLoggedIn){
        renderMessages(state);
        renderLoggedInList(state);
        renderMessageInput();
    }
}

export function renderMessages(state){
    const messagesEl = document.querySelector(".message__list");
    if (messagesEl){
        messagesEl.innerHTML = allMessage(state);
    }
}

export function renderLoggedInList(state){
    const userlistEl = document.querySelector(".user__list");
    if(userlistEl){
        userlistEl.innerHTML = otherUserList(state);
    }
}

export function renderMessageInput(){
    const inputEl = document.querySelector(".add__form");
    if(inputEl){
        inputEl.innerHTML = `
            <form class="add__form">
                <input class="add__message" name="newword" type="text" placeholder="Only made up of letters"/>
                <button class="submit__word" type="submit">Send</button>
            </form>
        `;
    }
}

//login html
function loginHtml(state) {
    if (!state.username && !state.error) {
        return `
            <div class="login"> 
                <h1>Welcome to the chat web!</h1>
                <p>Please login :-)</p>
                <div class="loginTab">
                    ${loginButton()}
                </div>
            </div>
         `;
    }
    if (!state.username && state.error) {
        return `
            <div class="login">  
                <h1>oops..</h1>
                <p>${state.error} </p>
                <p>Please login again ;-)</p>
                <div class="loginTab">${loginButton()}</div>
            </div>
         `;
    }

    if (state.isLoginPending) {
        return `
            <div class="login__waiting">Loading ...</div>
        `;
    }
    if (state.isLoggedIn) {
        return `
            <div class="log-out"> 
                <h1>Hi!</h1>
                <p><strong>${state.username}</strong></p>
                ${logoutButton()}
            </div>
        `;
    }
}

//after login
function chatTab(state) {
    if (!state.isLoggedIn) {
        return ``;
    }
    if (state.isChatPending) {
        return `<div class="chat__waiting">Loading ...</div>
        `;
    }
    return `
        <div class="chat-page">
            <div class="user-list">
                <p><strong>${state.username}</strong>(you)</p>
                <div class="user__list"></div>
            </div>
            <div class="chat-box">
                <h2>message</h2>
                <div class="message__list"></div>
                ${wrongMessage(state)}
                <div class="add__form"></div>
            </div>
        </div>
    `;
}


//login button
function loginButton() {
    return `
    <form class="login__form" action="#login">
        <input class="login__username" name="username" type="text" placeholder="please type your name"/>
        <button class="login__button" type="submit">Login</button>
    </form>
    `;
}

//logput button
function logoutButton() {
    return `
        <button class="controls__logout" type="button">Log Out</button>
    `;
}

//get user list
function otherUserList(state) {
    if(!state.userlist){
        return ``
    }
    return `
        <ul class="user__list">
            ${state.userlist.map(item => `<li class="message-item">${item}</li>`).join('')}
        </ul>
  `;
}

//get history message
function allMessage(state) {
    if(!Array.isArray(state.chats) || state.chats.length === 0){
        return `<p>no message</p>`
    }
    return `
    <ul class="message__list">
        ${state.chats.map(message => `
            <li class="message-item">
                <div class="message-header">
                <strong>${message.username}</strong> <span>${message.timestamp}</span>
                </div>
                <p class="message-text">${message.message}</p>
            </li>
        `).join('')}
    </ul>
    `;
}

// get error about message
function wrongMessage(state){
    return state.error?`<p>${state.error}</p>`:``;
}

export default render;