const viewers = {
    logInPage: function () {
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

    wordsPage: function (username,sortedWord) {
        return`
            <!doctype html>
            <html>
                <head>
                    <title>Words Data</title>
                    <link rel="stylesheet" href="/wordpage.css"> 
                </head>
                <body>
                    <h1>Hi, ${username}!</h1>
                    <p>Your current word is: ${sortedWord}</p>
                    <p>Wanna change the word? pleace type!</p>
                    <form action="/changeword" method="POST" class="changeWord">
                        <label for="username">New Word:</label>
                        <input type="text" name="newword" id="newword" placeholder="Type your new word here" required>
                        <button type="submit">UPDATE</button>
                    </form>
                    <form action="/logOut" method="POST">
                        <button type="submit">Logout</button>
                    </form>
                </body>       
            </html>
        `;
    },

    errorPage: function (message,errorNum) {
        return`
            <!doctype html>
            <html>
                <head>
                    <title>Error Page</title>
                    <link rel="stylesheet" href="/errorpage.css">
                </head>
                <body>
                    <h1>Error,${errorNum}</h1>
                    <p>Sorry, an error message about ${message}.</p>
                    <p>Please try again</p>
                    <form action="/" method="GET">
                        <button type="submit">Return To Login</button>
                </body>
            </html>
        `;
    }
}
module.exports = viewers;