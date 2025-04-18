import React from 'react';
import { useCart } from '../../context/CartContext';

const CartSummary = () => {
    const { cartItems, totalPrice } = useCart();

    return (
        <div className="cart-summary">
            <h2>Cart Summary</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <button onClick={() => alert('Proceeding to checkout...')}>Checkout</button>
        </div>
    );
};

export default CartSummary;