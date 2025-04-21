import React from 'react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { addItem, removeItem } = useCart();

  return (
    <div className="cart-item flex items-center justify-between bg-white p-4 rounded shadow">
      <div>
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)} each</p>
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={() => removeItem(item)}
          className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
        >
          -
        </button>
        
        <span className="px-4 py-1 bg-gray-100">
          {item.quantity}
        </span>
        
        <button 
          onClick={() => addItem(item)}
          className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
        >
          +
        </button>
        
        <div className="ml-6 font-bold">
          ${(item.quantity * item.price).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;