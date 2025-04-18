import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const { orderDetails } = location.state || {};

    return (
        <div className="order-confirmation">
            <h1>Thank You for Your Order!</h1>
            {orderDetails ? (
                <div>
                    <h2>Order Summary</h2>
                    <p>Name: {orderDetails.name}</p>
                    <p>Phone: {orderDetails.phone}</p>
                    <h3>Items Ordered:</h3>
                    <ul>
                        {orderDetails.items.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${orderDetails.total.toFixed(2)}</h3>
                </div>
            ) : (
                <p>No order details available.</p>
            )}
        </div>
    );
};

export default OrderConfirmation;