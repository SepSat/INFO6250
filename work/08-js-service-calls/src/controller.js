import { fetchSession, fetchLogin, fetchLogOut, fetchGetWord, fetchChangeWord } from './services';
import render from './view';
import state from './state';

const rootEl = document.querySelector('.main');


fetchSession()
    .then((Data) => {
        state.setName(Data.username);
        return fetchGetWord()
    })
    .then((wordData) => {
        state.setWord(wordData.storedWord);
        render(state, rootEl);
    })
    .catch((err) => {
        state.setNewError(err.error);
        render(state, rootEl);
    });

rootEl.addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('login')) {
        const userName = e.target.querySelector('.login-input').value;

        fetchLogin(userName)
            .then(() => {
                state.clearError();
                return fetchGetWord()
            })
            .then((data) => {
                state.setName(data.username);
                state.setWord(data.storedWord);
                render(state, rootEl);
            })
            .catch(err => {
                state.setNewError(err.error);
                render(state, rootEl);
            });
    }

    if (e.target.classList.contains('change-word')) {
        const newword = e.target.querySelector('.word-input').value;
        fetchSession()
        .catch(err => {
            state.logout();
            render(state, rootEl)
        })
        .then(() => {
            return fetchChangeWord(newword);
        })
        .then((data) => {
            state.clearError();
            state.setWord(data.storedWord);
            render(state, rootEl);
        })
        .catch(err => {
            state.setNewError(err.error);
            render(state, rootEl);
        });
    }
});

rootEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('logout-button')) {
        fetchLogOut()
            .then(() => {
                state.logout();
                render(state, rootEl)
            })
            .catch(err => {
                state.setNewError(err.error);
                render(state, rootEl);
            });
    }
});
