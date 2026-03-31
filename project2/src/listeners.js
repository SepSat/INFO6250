import {
    fetchLogin,
    fetchLogout,
    fetchGetChats,
    fetchSendChat,
} from './services';
import {
    waitOnLogin,
    login,
    logout,
    waitSendChat,
    setchat,
    setUserList,
    setError,
} from './state';

import render from './render';

import {startPolling, stopPolling} from './polling';

export function addAbilityToLogin({ state, appEl }) {
    appEl.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('login__form')) {
            return;
        }
        e.preventDefault();
        const username = appEl.querySelector('.login__username').value;
        waitOnLogin();
        render({ state, appEl }); 
        fetchLogin(username)
            .then(nameData => {
                login(nameData.username);
                render({ state, appEl });
                startPolling({ state, appEl });
                return fetchGetChats();
            })
            .then(data => {
                setchat(data.chats);
                setUserList(data.userList);
                render({ state, appEl });
            })
            .catch(err => {
                setError(err?.error || 'ERROR'); 
                render({ state, appEl });
            });

    });
}

export function addAbilityToLogout({ state, appEl }) {
    appEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('controls__logout')) {
            return;
        }
        logout();
        stopPolling();
        render({ state, appEl });
        fetchLogout() 
        .catch(err => {
            setError(err?.error || 'ERROR'); 
            render({ state, appEl });
        });
    });
}

export function addAbilityToSendMessage({ state, appEl }) {
    appEl.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('add__form')) {
            return;
        }
        e.preventDefault(); 
        const message = appEl.querySelector('.add__message').value;
        waitSendChat();
        render({ state, appEl }); 
        fetchSendChat(message)
        .catch(err =>{
            setError(err?.error || 'ERROR');
            render({ state, appEl });
        })
        .then(() => {
            return fetchGetChats();
        })
        .then((data) => {
            setUserList(data.userList);
            setchat(data.chats);
            render({ state, appEl });
        })
        .catch(err => {
            setError(err?.error || 'ERROR');
            render({ state, appEl });
        });
    });
}