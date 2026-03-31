import { SERVER } from './constants';
import render,{
    renderMessages,
    renderLoggedInList,
} from './render';

import {
    fetchGetChats,
} from './services';

import {
    logout,
    setchat,
    setUserList,
    setError,
} from './state';


let updateChat;

export function startPolling({ state, appEl }){
    stopPolling();
    updateChat = setInterval(() => {
        fetchGetChats()
        .then(data => {
            setUserList(data.userList);
            renderLoggedInList(state);
            setchat(data.chats);
            renderMessages(state);
        })
        .catch(err => {
            if (err?.error == SERVER.AUTH_MISSING) { 
                stopPolling();
                logout(); 
                render({ state, appEl });
            } else {
                setError(err?.error || 'ERROR') 
                render({ state, appEl });
            }
        });
    }, 5000);
}

export function stopPolling(){
    if (updateChat){
        clearInterval(updateChat);
        updateChat = null;
    }
}