import React from 'react';
import { useCart } from '../../context/CartContext';

const MenuItem = ({ item }) => {
    const { addItem } = useCart();
    
    return (
        <div className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price?.toFixed(2)}</p>
            <button 
                onClick={() => addItem(item)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default MenuItem;