const viewers = {
    logInPage: function (status) {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>login</title>
                    <link rel="stylesheet" href="/login.css">
                </head>
                <body>
                    <div id="login-app">
                        <h1>Login</h1>
                        <p>${status}</p>
                        <form action="/login" method="POST" class="logIn">
                            <label for="username">USER NAME:</label>
                            <input type="text" name="username" id="username" placeholder="Only made up of letters and numbers">
                            <button type="submit">Log In</button>
                        </form>
                    </div>
                </body>
            </html>
        `;
    },

    guessPage: function (username,wordlist,isgamming,guessingtimes,guessinghistory) {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>playGame</title>
                    <link rel="stylesheet" href="/guess.css">
                </head>
                <body>
                    <div>
                        <h1>Hi, ${username}!</h1>
                        <p>Welcome to the guessing game! Have fun and good luck!</p>
                        <form action="/" method="POST">
                            <button type="submit">LogOut</button>
                        </form>
                    </div>
                    <div>
                        <div class="right-side">
                            ${isgamming ? viewers.guessTab(guessingtimes,guessinghistory) : viewers.winGameTab(guessinghistory)}
                        </div>
                        <div class="word-list">
                            <h2>Possible words</h2>
                            <p>Guess using a word from the valid list.</p>
                            <ul class="wordlist">`+
                            wordlist.map(word => `
                                <li class="single-word">${word}</li>
                                `).join("") + `
                            </ul>
                        </div>
                    </div>
                </body>       
            </html>
        `;
    },
    guessTab: function (guessingtimes, guessinghistory) {
        if (guessingtimes === 0) {
            return `
                <h2>You have already guessed ${guessingtimes} times.</h2>
                <p>No guessing history here</p>
                <div>
                    <form action="/guess" method="POST" class="new-guess">
                        <label for="newword">Enter Your Guess:</label>
                        <input type="text" name="newword" id="newword" placeholder="Type your guess here">
                        <button type="submit">Check</button>
                    </form>
                </div>
            `;
        } else {
            const historyHTML = guessinghistory.map(item => `
                <p><strong>your guess:</strong> ${item.inputword}  |  <strong>feedback:</strong> ${item.feedback}  |  <strong>time:</strong> ${item.timestamp}</p>
            `).join('');
    
            return `
                <h2>You have already guessed ${guessingtimes} times.</h2>
                <div>
                    ${historyHTML}
                </div>
                <div>
                    <form action="/guess" method="POST" class="new-guess">
                        <label for="newword">Enter Your Guess:</label>
                        <input type="text" name="newword" id="newword" placeholder="Type your guess here">
                        <button type="submit">Check</button>
                    </form>
                </div>
            `;
        }
    },
    winGameTab: function (guessinghistory = []) {
        if (guessinghistory.length === 0) {
            return `
                <h2>"Well done!"</h2>
                <p> "You've completed the game!"</p>
                <form action="/newgame" method="POST" class="new-game">
                    <button type="submit">New Game</button>
                </form>
                <p>No guessing history to show.</p>
            `;
        } else {
            const historyHTML = guessinghistory.map(item => `
                <p>Yourguess: ${item.inputword}, Feedback: ${item.commonNumber}, time:${item.timestamp}</p>
            `).join('');
            return `
                <h2>"Well done!"</h2>
                <p> "You've completed the game!"</p>
                <form action="/newgame" method="POST" class="new-game">
                    <button type="submit">New Game</button>
                </form>
                <div>
                    ${historyHTML}
                </div>
            `;
        }
    },    
};
module.exports = viewers;