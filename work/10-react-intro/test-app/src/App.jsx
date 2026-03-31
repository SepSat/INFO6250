import { useState } from 'react'
import Game from './Game';
import Login from './Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='app'>
      {isLoggedIn ? (
        <Game setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default App;
