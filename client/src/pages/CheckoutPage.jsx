import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CheckoutForm from '../components/Order/CheckoutForm';

const CheckoutPage = () => {
    const { items, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <p className="mb-4">You need to add items to your cart before checkout.</p>
                <Link to="/menu" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Go to Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Order Summary</h2>
                <ul className="divide-y">
                    {items.map(item => (
                        <li key={item._id} className="py-2">
                            <div className="flex justify-between">
                                <span>{item.quantity} x {item.name}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="font-bold text-xl mt-4 border-t pt-2">
                    Total: ${totalPrice.toFixed(2)}
                </div>
            </div>
            
            <CheckoutForm />
        </div>
    );
};

export default CheckoutPage;