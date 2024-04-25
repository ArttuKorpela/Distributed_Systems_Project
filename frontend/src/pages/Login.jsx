import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call backend API to log in the user and get the token
        const response = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            setIsLoggedIn(true);
            navigate('/logout');
        } else {
            console.log(data.message);
        }
    }

    return(
        <div className="login">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="login-fields">
                <input type='email' placeholder='email address' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Continue</button>
                </form>
            </div>
        </div>
    )
}

export default Login