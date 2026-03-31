function render(state, rootEl) {
    const { nowWord, nowName, isError, nowError } = state;
    let errorfeedback = getErrorInfo(nowError);
    let html;
    if (!nowName) {
        if (isError) {
            html = loginAgainPage(errorfeedback);
        } else {
            html = loginPage();
        }
    } else {
        if (isError) {
            html = wrongwordPage(nowName, nowWord, errorfeedback);
        } else {
            html = rightwordPage(nowName, nowWord);
        }
    }
    rootEl.innerHTML = html
}

function getErrorInfo(newError){
    if (newError ===  'required-username'){
        return`<p>It looks like you enter a invalid username.<p>`
    }else if(newError ===  'auth-insufficient'){
        return`<p>It looks like 'dog' is not a valid username.<p>`
    }else if(newError ===  'required-word'){
        return`<p>It looks like you forgot to enter a word.<p>`
    }else if(newError ===  'invalid-word'){
        return`<p>This word is too long, too short, or contains invalid characters.<p>`
    }
}

function loginPage() {
    const inButton = loginButton();
    return `
        <p>Please login :-)</p>
        ${inButton}
    `;
}

function rightwordPage(user, word) {
    const wordButton = changeWordButton();
    const loutButton = logoutButton();
    return `
        <h2>${user}</h2>
        ${loutButton}
        <p>This is your secret word:</p>
        <h1>${word}</h1>
        ${wordButton}
    `;
}

function loginAgainPage(error) {
    const inButton = loginButton();
    return `
        <p><strong>oops...</strong></p>
        ${error}
        <p>Please login again :-)</p>
        ${inButton}
    `;
}

function wrongwordPage(user, word, error) {
    const wordButton = changeWordButton();
    const loutButton = logoutButton();
    return `
        <h2>${user}</h2>
        ${loutButton}
        <p>This is your secret word:</p>
        <h1>${word}</h1>
        <p>${error}</p>
        ${wordButton}
    `;
}

function loginButton(){
    return `
    <form class="login">
        <input class="login-input" name="username" type="text" placeholder="Only made up of letters and numbers"/>
        <button class="login-button" type="submit">Log In</button>
    </form>
    `;
}

function logoutButton(){
    return`
        <button class="logout-button" type="button">Log Out</button>
    `;
}

function changeWordButton(){
    return`
        <form class="change-word">
            <input class="word-input" name="newword" type="text" placeholder="Only made up of letters"/>
            <button class="submit-word" type="submit">Update</button>
        </form>
    `;
}

export default render;