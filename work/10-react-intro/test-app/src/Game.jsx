import React, { useState } from 'react';
import compareWords from './compare';

const Game = ({setIsLoggedIn}) => {
    const [guessWord, setGuessWord] = useState('');
    const [feedBack, setFeedBack] = useState('');
    const secretWord = 'RECAT';

    const guessing = (e) => {
        e.preventDefault();

        if(guessWord.length !== 5 || !/^[a-zA-Z]+$/.test(guessWord)){
            setFeedBack(`Sorry, ${guessWord} is not a valid word.`);
            return
        }
        if(guessWord.toUpperCase() === secretWord){
            setFeedBack('You are right!');
            return
        }
        const commonNum = compareWords(guessWord,secretWord);
        setFeedBack(`These two words have ${commonNum} same letters`);
        setGuessWord('');
    };

    const handleLogout = () =>{
        setIsLoggedIn(false);
    }
    return (
        <div className='game-page'>
            <h1>Guessing Game</h1>
            <button className='button' onClick={handleLogout}>Logout</button>
            {feedBack && <p>{feedBack}</p>}
            <form className='word-form' onSubmit={guessing}>
                <input className='input' type='text' placeholder='enter a five letters word' value={guessWord} onChange={(e) => setGuessWord(e.target.value)} />
                <button className='button' type='submit'>Submit Word</button>
            </form>
        </div>
    );
};

export default Game;