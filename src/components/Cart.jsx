import React, { useState } from 'react';
import axios from 'axios';

const Cart = ({ cart, setCart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('cart'); // 'cart', 'success', 'error'
  const [orderSummary, setOrderSummary] = useState({});

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeOrder = async () => {
    try {
      await axios.post('http://localhost:5000/send-order', {
        name,
        email,
        cart,
        total
      });

      setOrderSummary({ name, email, total });
      setCart([]);
      setName('');
      setEmail('');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      console.error('Email failed:', err);
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-4 p-4 border rounded bg-green-50 shadow">
        <h2 className="text-xl font-bold text-green-800">✅ Order Confirmed</h2>
        <p className="mt-2">Thank you, <b>{orderSummary.name}</b>!</p>
        <p>Your order of <b>₹{orderSummary.total}</b> has been placed.</p>
        <p>Confirmation sent to <b>{orderSummary.email}</b>.</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="mt-4 p-4 border rounded bg-red-50 shadow text-red-600">
        <h2 className="text-xl font-bold">❌ Failed to place order</h2>
        <p>Please check your internet or server settings.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-2">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.title} x{item.quantity} — ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: ₹{total}</p>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className="block border p-1 mt-2" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email" className="block border p-1 mt-2" />
          <button onClick={placeOrder} className="mt-2 bg-green-600 text-white px-4 py-1 rounded">
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
