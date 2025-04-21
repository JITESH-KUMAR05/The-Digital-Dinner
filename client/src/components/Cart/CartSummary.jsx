import React from 'react';
import { useCart } from '../../context/CartContext';

const CartSummary = () => {
    const { items, totalPrice } = useCart();

    // Check if cartItems is undefined or empty
    if (!items || items.length === 0) {
        return (
          <div className="cart-summary bg-gray-100 p-4 rounded">
            <p>Your cart is empty</p>
          </div>
        );
      }

      return (
        <div className="cart-summary bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Order Summary</h3>
          
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item._id || item.id} className="flex justify-between">
                <span>{item.quantity} x {item.name}</span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t mt-4 pt-4 font-bold flex justify-between">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      );
};

export default CartSummary;