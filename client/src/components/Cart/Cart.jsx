import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const Cart = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className="cart">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    <CartSummary />
                </div>
            )}
        </div>
    );
};

export default Cart;