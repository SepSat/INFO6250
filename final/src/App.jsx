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
  fetchGetGames,
  fetchAddGames,
  fetchChangeGames,
  fetchCheckSubscribe,
  fetchSubscribe,
  fetchUnSubscribe,
} from './services';

import LoginForm from './LoginForm';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import PlatformTab from './PlatformTab';
import GameList from './GameList';
import GameEditList from './GameEditList';
import GameDetail from './GameDetail';
import GameEditForm from './GameEditForm';
import AddNewGame from './AddNewGame';

function App() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [Platform, setPlatform] = useState("indie");
  const [games, setGames] = useState("");
  const [gamePrice, setGamePrice] = useState("");
  const [subscribe, setSubscribe] = useState([]);
  const [isAdministrator, setIsAdministrator] = useState(false);
  const [adminLevel, setAdminLevel] = useState("");
  const [page, setPage] = useState(window.location.pathname);


  function onLogin(userName) {
    fetchLogin(userName)
      .then((data) => {
        setError('');
        setIsAdministrator(data.isAdministrator);
        setAdminLevel(data.adminLevel);
        setUsername(userName);
        return fetchGetGames();
      })
      .then((data) => {
        setError('');
        setGames(data.games);
        setGamePrice(data.platforms);
        return fetchCheckSubscribe();
      })
      .then((data) => {
        setError('');
        setSubscribe(data.subscribes);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  };

  function onLogout() {
    setError('');
    setUsername('');
    setIsAdministrator(false);
    setAdminLevel("");
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogOut()
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  };

  function checkForSession() {
    fetchSession()
      .then(session => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.PENDING);
        return fetchGetGames();
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return Promise.reject({ error: CLIENT.NO_SESSION })
        }
        return Promise.reject(err);
      })
      .then((data) => {
        setError('');
        setGames(data.games);
        setGamePrice(data.platforms);
        return fetchCheckSubscribe();
      })
      .then((data) => {
        setError('');
        setSubscribe(data.subscribes);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || 'ERROR');
      });
  };

  useEffect(
    () => {
      checkForSession();
    },
    [] // Only run on initial render
  );

  useEffect(
    () => {
      function onPageChange() {
        setPage(document.location.pathname);
      }

      window.addEventListener('popstate', onPageChange);

      return () => {
        window.removeEventListener('popstate', onPageChange);
      }
    },
    [] // Only run on initial render
  );

  function handlePlatform(platformId) {
    setPlatform(platformId);
  };

  function onSubscribeToggle(gID, isSubscribed) {

    const handleSubscribe = isSubscribed ? fetchUnSubscribe : fetchSubscribe;

    fetchSession()
      .catch(err => {
        setError('');
        setUsername('');
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        setError(err?.error || 'ERROR');
      })
      .then(() => {
        setError('');
        return handleSubscribe(gID);
      })
      .then((data) => {
        setError('');
        setSubscribe(data.subscribes);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  };

  function onSubmitNewGame(formData) {
    fetchSession()
      .catch(err => {
        setError('');
        setUsername('');
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        setError(err?.error || 'ERROR');
      })
      .then(() => {
        setError('');
        return fetchAddGames(formData);
      })
      .then((data) => {
        setError('');
        setGames(data.games);
        setGamePrice(data.platforms);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        const gamePath = `/`;
        window.history.pushState(null, "", gamePath);
        setPage(gamePath);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  };

  function onSubmitEditGame(formData) {
    fetchSession()
      .catch(err => {
        setError('');
        setUsername('');
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        setError(err?.error || 'ERROR');
      })
      .then(() => {
        setError('');
        return fetchChangeGames(formData);
      })
      .then((data) => {
        setError('');
        setGames(data.games);
        setGamePrice(data.platforms);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        const gamePath = `/`;
        window.history.pushState(null, "", gamePath);
        setPage(gamePath);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  };

  // function onGetGames(){
  //   fetchSession()
  //   .catch(err => {
  //     setError('');
  //     setUsername('');
  //     setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
  //     setError(err?.error || 'ERROR');
  //   })
  //   .then((data) => {
  //     setError('');
  //    
  //     setGames(data);
  //   })
  //   .catch(err => {
  //     setIsWordPending(false);
  //     setError(err?.error || 'ERROR'); 
  //   });
  // }

  return (
    <div className="app">
      <main className="main">
        {error && <Status error={error} />}
        {page === "/" && loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading>}
        {page === "/" && loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
        {page === "/" && loginStatus === LOGIN_STATUS.IS_LOGGED_IN && !isAdministrator && (
          <div>
            <div className="controls">
              <Controls username={username} onLogout={onLogout} />
            </div>
            <div className="showgames">
              <PlatformTab onPlatformTab={handlePlatform} />
              <GameList
                platform={Platform}
                games={games}
                gamePrice={gamePrice}
                subscribe={subscribe}
                onSubscribeToggle={onSubscribeToggle}
                setPage={setPage}
              />
            </div>
          </div>
        )}
        {page === "/" && loginStatus === LOGIN_STATUS.IS_LOGGED_IN && isAdministrator && (
          <div>
            <div className="controls">
              <Controls username={username} onLogout={onLogout} />
            </div>
            <GameEditList
              adminLevel={adminLevel}
              games={games}
              setPage={setPage}
            />
          </div>
        )}
        {page.startsWith('/game/edit/') && (
          <GameEditForm
            games={games}
            gamePrice={gamePrice}
            gID={page.split("/game/edit/")[1]}
            onSubmitEditGame={onSubmitEditGame}
          />
        )}
        {page.startsWith('/game/detail/') && (
          <GameDetail
            games={games}
            gamePrice={gamePrice}
            gID={page.split("/game/detail/")[1]}
            subscribe={subscribe}
            onSubscribeToggle={onSubscribeToggle}
          />
        )}
        {page === "/game/add" && (
          <>
            <h1>Add New Game</h1>
            <AddNewGame
              onSubmitNewGame={onSubmitNewGame}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;