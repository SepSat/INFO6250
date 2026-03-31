import { useState, useEffect } from 'react';

import './App.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogOut,
  fetchGetWord,
  fetchChangeWord
} from './services';

import LoginForm from './LoginForm';
import WordShow from './WordShow';
import Loading from './Loading';
import Content from './Content';
import Status from './Status';
import UpdateWord from './UpdateWord';

function App() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING)
  const [isWordPending, setIsWordPending] = useState(false);
  const [word, setWord] = useState('');


  function onLogin(userName) {
    setIsWordPending(true);
    fetchLogin(userName)
      .then(() => {
        return fetchGetWord();
      })
      .then((wordData) => {
        setError('');
        setWord(wordData.storedWord);
        setIsWordPending(false);
        setUsername(userName);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  };

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setWord('');
    fetchLogOut()
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  function onUpdateWord(newWord) {
    fetchSession()
    .catch(err => {
      setError('');
      setUsername('');
      setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
      setWord('');
      setError(err?.error || 'ERROR');
    })
    .then(() => {
      setIsWordPending(true);
      return fetchChangeWord(newWord);
    })
    .then((data) => {
      setIsWordPending(false);
      setError('');
      setWord(data.storedWord);
    })
    .catch(err => {
      setIsWordPending(false);
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function checkForSession() {
    fetchSession()
      .then(session => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchGetWord();
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION })
        }
        return Promise.reject(err);
      })
      .then((wordData) => {
        setWord(wordData.storedWord);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || 'ERROR');
      });

  }

  useEffect(
    () => {
      checkForSession();
    },
    [] // Only run on initial render
  );

  return (
    <div className="app">
      <main className="main">
        {error && <Status error={error} />}
        {loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading>}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <Content username={username} onLogout={onLogout} />
            <WordShow
              storedWord={word}
              isWordPending={isWordPending}
            />
            <UpdateWord onUpdateWord={onUpdateWord} />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;