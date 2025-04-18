import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/api';
import OrderHistory from '../components/Order/OrderHistory';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const response = await fetchOrders();
                setOrders(response);
            } catch (err) {
                setError('Failed to fetch orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div>
            <h1>Your Orders</h1>
            {orders.length > 0 ? (
                <OrderHistory orders={orders} />
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrdersPage;