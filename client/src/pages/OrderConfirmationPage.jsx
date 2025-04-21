import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const location = useLocation();
    const { order, customerName, customerPhone } = location.state || {};

    if (!order) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">No order information</h1>
                <p className="mb-4">We couldn't find information about your order.</p>
                <Link to="/menu" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Go to Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="order-confirmation">
            <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
                <h1 className="text-2xl font-bold">Order Placed Successfully!</h1>
                <p>Thank you for your order, {customerName}.</p>
            </div>
            
            <div className="bg-white p-6 rounded shadow mb-6">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Name:</strong> {customerName}</p>
                <p><strong>Phone:</strong> {customerPhone}</p>
                
                <h3 className="font-bold mt-4 mb-2">Items Ordered:</h3>
                <ul className="divide-y">
                    {order.items.map((item, index) => (
                        <li key={index} className="py-2">
                            <div className="flex justify-between">
                                <span>{item.quantity} x {item.name}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                
                <div className="font-bold text-xl mt-4 pt-2 border-t">
                    Total: ${order.totalPrice.toFixed(2)}
                </div>
            </div>
            
            <div className="flex space-x-4">
                <Link to="/menu" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Order More
                </Link>
                <Link to="/orders" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    View All Orders
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;