import { SERVER, CLIENT } from './constants';
import state, {
    waitOnLogin,
    login,
    logout,
    waitSendChat,
    setchat,
    setUserList,
    setError,
} from './state';
import {
    fetchSession,
    fetchLogin,
    fetchLogout,
    fetchGetChats,
    fetchSendChat,
} from './services';
import render from './render';
import {
    addAbilityToLogin,
    addAbilityToLogout,
    addAbilityToSendMessage,
} from './listeners';

import {startPolling, stopPolling} from './polling';

const appEl = document.querySelector('#app');
render({ state, appEl });
addAbilityToLogin({ state, appEl });
addAbilityToLogout({ state, appEl });
addAbilityToSendMessage({ state, appEl });
checkForSession();

function checkForSession() {
    fetchSession()
    .then(session => {
        login(session.username);
        render({ state, appEl });
        startPolling({ state, appEl });
        return fetchGetChats();
    })
    .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
            return Promise.reject({ error: CLIENT.NO_SESSION })
        }
        return Promise.reject(err);
    })
    .then(data => {
        setUserList(data.userList)
        setchat(data.chats);
        render({ state, appEl });
    })
    .catch(err => {
        if (err?.error == CLIENT.NO_SESSION) { 
            logout(); 
            render({ state, appEl });
            stopPolling();
            return;
        }
        setError(err?.error || 'ERROR'); 
        render({ state, appEl });
    });
}

