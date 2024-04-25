import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const { setIsLoggedIn } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    }

    return (
        <div>
            <h1>You're now logged in</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout;
