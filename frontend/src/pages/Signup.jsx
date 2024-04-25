import React, { useState } from 'react'
import { Link } from 'react-router-dom';
//import './CSS/Signup.css'

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call backend API to log in the user and get the token
    const response = await fetch('http://localhost:8000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          "name":name, 
          "email":email, 
          "password":password }),
    });
    const data = await response.json();
    if (data.success) {
        console.log(data.message);
    } else {
        console.log(data.message);
    }
}

  return (
    <div className='signup'>
      <div className="signup-container">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit} className="signup-fields">
          <input type='text' placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)}/>
          <input type='email' placeholder='email address' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Continue</button>
        </form>
        <p className="signup-login">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  )
}

export default Signup
