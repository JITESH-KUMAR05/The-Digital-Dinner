import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import api from '../../services/api';
import './OrderForm.css';

const OrderForm = () => {
    const { cartItems, totalPrice } = useContext(CartContext);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !phone) {
            setMessage('Please fill in all fields.');
            return;
        }

        const orderData = {
            name,
            phone,
            items: cartItems,
            total: totalPrice,
        };

        try {
            await api.post('/orders', orderData);
            setMessage('Order placed successfully!');
            setName('');
            setPhone('');
        } catch (error) {
            setMessage('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="order-form">
            <h2>Place Your Order</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
};

export default OrderForm;