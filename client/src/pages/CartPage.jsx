import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, totalPrice } = useContext(CartContext);

    return (
        <div className="cart-page">
            <h1>Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div>
                    <p>Your cart is empty.</p>
                    <Link to="/menu">Go back to Menu</Link>
                </div>
            ) : (
                <div>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    <CartSummary totalPrice={totalPrice} />
                </div>
            )}
        </div>
    );
};

export default CartPage;