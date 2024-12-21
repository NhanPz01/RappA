import {message} from 'antd';
import React, { useState } from 'react';
import '../assets/Login.css';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
         // Validation for username
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Regex for special characters
        if (!username || specialCharRegex.test(username)) {
            message.error('Username cannot be empty or contain special characters.'); // Show error message
            return;
        }
         // Validation for password
        if (password.length < 8) {
            message.error('Password must be at least 8 characters long.'); // Show error message
            return;
        }
         // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };
    return (
        <div style={{
            display: 'flex', // {{ edit_1 }}
            justifyContent: 'center', // {{ edit_2 }}
            alignItems: 'center', // {{ edit_3 }}
            height: '100vh',
            width: '100vw' // {{ edit_4 }}
        }}>
            <div style={{
                display: 'flex-col',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <h2 style={{ color: '#333' }}>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div >
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className='input-field'
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='input-field'
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};
export default Login;