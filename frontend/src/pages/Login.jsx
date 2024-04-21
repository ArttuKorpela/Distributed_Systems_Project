import React, { useState } from "react";
//import '.CSS/Login.css'

const Login2 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //backend
        console.log(email, password);
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

export default Login2