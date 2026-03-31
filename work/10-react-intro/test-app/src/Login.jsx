import { useState } from 'react';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [errorText, setErrorText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            setErrorText("Please enter a valid (letters and/or numbers) username");
            return
        }

        if (username === 'dog') {
            setErrorText("'dog' is an invalid username.");
            return
        }

        setErrorText('');
        setIsLoggedIn(true);
    };


    return (
        <div className='login-page'>
            <h1>Login</h1>
            {errorText && <p className='error-text'>{errorText}</p>}
            <form className='login-form' onSubmit={handleSubmit}>
                <input className='input' type='text' placeholder='enter your name' value={username} onChange={(e) => setUsername(e.target.value)} />
                <button className='button' type='submit' >Login</button>
            </form>
        </div>
    );
};

export default Login;