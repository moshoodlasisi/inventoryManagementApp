import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./login.css"
import ErrorMessage from './components/ErrorMessage';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const history = useHistory

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(':::::: FORM DATA ::::::::', { username, password });

        try {
            const promiseResponse = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await promiseResponse.json();

            if (data.accessToken) {
                localStorage.setItem(
                    'loginData',
                    JSON.stringify({ username, accessToken: data.accessToken })
                );
                history.push('/inventory');
            } else {
                setShowError(true);
            }
        } catch (error) {
            console.log('::: ERROR OCCURED', error);
            setShowError(true);
        }
    };

    return (
        <div className="container">
            
            <div>
               {showError && (
                 <ErrorMessage />
               )} 
            </div>
            
            <h1>Welcome Back!</h1>
            <form onSubmit={handleSubmit} id="login-form">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <input type="submit" id="login-btn" value="Login" />
            </form>
        </div>
    );
}

export default LoginPage;
