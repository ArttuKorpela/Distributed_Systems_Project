import React, { useState } from 'react';
import { ShopContext } from '../../context/ShopContext';

const { getTotalCart } = useContext(ShopContext);
const token = localStorage.getItem('token');

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

const Checkout = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const total = getTotalCart();
    // Call backend API to log in the user and get the token
    const response = await fetch('http://localhost:8000/user/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({ name, cardNumber, expiryDate, cvv, total }),
    });
    const data = await response.json();
    if (data.success) {
        setMessage(data.message);
    } else {
        setMessage(data.message);
    }
}

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)} />
        <input type='text' placeholder='Card number' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        <input type='text' placeholder='Expiry date' value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        <input type='text' placeholder='CVV' value={cvv} onChange={(e) => setCvv(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>} {/* Add this line */}
    </div>
  )
}

export default Checkout;
