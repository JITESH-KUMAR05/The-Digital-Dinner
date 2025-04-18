import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../../services/api';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleFetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedOrders = await fetchOrders(phoneNumber);
            setOrders(fetchedOrders);
        } catch (err) {
            setError('Failed to fetch orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (phoneNumber) {
            handleFetchOrders();
        }
    }, [phoneNumber]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFetchOrders();
    };

    return (
        <div>
            <h2>Order History</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <button type="submit">Fetch Orders</button>
            </form>
            {loading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {orders.length > 0 && (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <h3>Order ID: {order.id}</h3>
                            <p>Items: {order.items.join(', ')}</p>
                            <p>Total: ${order.total}</p>
                            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
            {orders.length === 0 && !loading && !error && <p>No orders found.</p>}
        </div>
    );
};

export default OrderHistory;