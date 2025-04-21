import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';

const CartPage = () => {
    const { items: cartItems, totalPrice } = useCart();

    return (
        <div className="cart-page">
            <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div>
                    <p className="mb-4">Your cart is empty.</p>
                    <Link 
                        to="/menu" 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Go back to Menu
                    </Link>
                </div>
            ) : (
                <div>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>
                    <div className="mt-6">
                        <CartSummary totalPrice={totalPrice} />
                    </div>
                    <div className="mt-4">
                        <Link 
                            to="/checkout" 
                            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;