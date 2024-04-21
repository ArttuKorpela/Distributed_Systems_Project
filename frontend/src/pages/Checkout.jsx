import React, { useState } from 'react';

const Checkout = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //backend implementation
    console.log(name, cardNumber, expiryDate, cvv);
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
    </div>
  )
}

export default Checkout;
