import React, { useState } from 'react';
import { fetchOrdersByPhone } from '../../services/api';  // Update this import

const OrderHistory = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const data = await fetchOrdersByPhone(phoneNumber);  // Use the correct function
            setOrders(data);
            setSearched(true);
        } catch (err) {
            setError('Failed to fetch orders. Please try again.');
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="order-history-component">
            <h2 className="text-xl font-bold mb-4">Find Your Orders</h2>
            
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex">
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                        className="flex-grow p-2 border rounded-l"
                    />
                    <button 
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                    >
                        {loading ? 'Loading...' : 'Find Orders'}
                    </button>
                </div>
            </form>
            
            {error && <div className="text-red-500 mb-4">{error}</div>}
            
            {searched && !loading && orders.length === 0 && (
                <div className="text-gray-500">No orders found with this phone number.</div>
            )}
            
            {orders.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-3">Your Orders</h3>
                    {orders.map(order => (
                        <div key={order.id} className="bg-white p-4 rounded shadow mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Order #{order.id}</span>
                                <span>{new Date(order.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="mb-2">
                                <strong>Items:</strong>
                                <ul className="pl-5">
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>
                                            {item.quantity}x {item.name} - ${(item.price * item.quantity).toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-right font-bold">
                                Total: ${order.totalPrice.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;