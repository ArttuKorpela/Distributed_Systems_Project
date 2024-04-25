import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';



const Checkout = () => {
  const { getTotalCart } = useContext(ShopContext); // Accessing context
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem('token');
      setToken(token);
      const response = await fetch('http://localhost:8000/user/tokenValid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
      const data = await response.json();
      if (data.success) {
        console.log('Token is valid');
      } else {
        console.log('Token is not valid');
      }
    };

    fetchToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = getTotalCart();
    const response = await fetch('http://localhost:8000/user/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({ phoneNumber, total }),
    });
    const data = await response.json();
    setMessage(data.message);
  }

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Your phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Checkout;
