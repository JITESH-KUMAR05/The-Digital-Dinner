import React from 'react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
    const { removeItem } = useCart();
    
    return (
        <div className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <button 
                onClick={() => removeItem(item)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
                Remove
            </button>
        </div>
    );
};

export default CartItem;