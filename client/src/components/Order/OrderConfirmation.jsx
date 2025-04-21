import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const location = useLocation();
    const { order, customerName, customerPhone } = location.state || {};

    // Make sure we have order data, otherwise show an error
    if (!order) {
        return (
            <div className="text-center py-8">
                <h1 className="text-2xl font-bold mb-4">No Order Information Available</h1>
                <p className="mb-6">We couldn't find information about your order.</p>
                <Link to="/menu" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Return to Menu
                </Link>
            </div>
        );
    }

    // Parse totalPrice to ensure it's a number
    const totalPrice = typeof order.totalPrice === 'string' 
        ? parseFloat(order.totalPrice) 
        : order.totalPrice;

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
                <h1 className="text-2xl font-bold text-green-800">Order Confirmed!</h1>
                <p className="text-green-700">Thank you for your order, {customerName}.</p>
            </div>

            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Details</h2>
                
                <div className="mb-4">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Name:</strong> {customerName}</p>
                    <p><strong>Phone:</strong> {customerPhone}</p>
                </div>
                
                <h3 className="font-bold mb-2">Items:</h3>
                <ul className="divide-y">
                    {order.items && order.items.map((item, index) => (
                        <li key={index} className="py-2 flex justify-between">
                            <span>{item.quantity} x {item.name}</span>
                            <span>${(item.quantity * parseFloat(item.price)).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                
                <div className="mt-4 pt-2 border-t font-bold text-xl flex justify-between">
                    <span>Total:</span>
                    <span>${isNaN(totalPrice) ? '0.00' : totalPrice.toFixed(2)}</span>
                </div>
            </div>
            
            <div className="mt-6 flex space-x-4 justify-center">
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