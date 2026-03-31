import { MESSAGES } from './constants';

const state = {
    chats: [],
    isLoggedIn: false,
    isLoginPending: true,
    isChatPending: false,
    username: '',
    userlist: [],
    error: '',
};

export function waitOnLogin() {
    state.isLoggedIn = false;
    state.isLoginPending = true;
    state.username = '';
    state.chats = {};
    state.error = '';
}

export function login(username) {
    state.isLoggedIn = true;
    state.isLoginPending = false;
    state.username = username;
    state.error = '';
}

export function logout() {
    state.isLoggedIn = false;
    state.isLoginPending = false;
    state.username = '';
    state.chats = {};
    state.error = '';
}

export function waitSendChat() {
    state.chats = {};
    state.isChatPending = true;
    state.error = '';
}

export function setchat(chats) {
    state.chats = chats;
    state.isChatPending = false;
}

export function setUserList(allUser) {
    state.userlist = allUser.filter(item => item != state.username);
}

export function setError(error) {
    if (!error) {
        state.error = '';
        return;
    }
    state.isLoginPending = false;
    state.isChatPending = false;
    state.error = MESSAGES[error] || MESSAGES.default;
}
export function clearError(){
    state.error = '';
}

export default state;