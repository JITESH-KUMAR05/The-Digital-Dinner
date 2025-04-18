import React from 'react';

const MenuItem = ({ item, onAddToCart }) => {
    return (
        <div className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => onAddToCart(item)}>Add to Cart</button>
        </div>
    );
};

export default MenuItem;