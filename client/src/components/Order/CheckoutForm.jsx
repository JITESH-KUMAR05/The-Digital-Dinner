import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/api';

const CheckoutForm = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { items, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const orderData = {
                name,
                phoneNumber,
                items,
                totalPrice
            };

            const response = await createOrder(orderData);
            
            // Clear the cart after successful order
            clearCart();
            
            // Navigate to confirmation page
            navigate('/order-confirmation', {
                state: {
                  order: {
                    id: response.order.id,
                    items: items,
                    totalPrice: totalPrice  // Make sure this is a number
                  },
                  customerName: name,
                  customerPhone: phoneNumber
                }
              });
        } catch (err) {
            setError('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-form max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            
            {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block mb-1">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400"
                >
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;