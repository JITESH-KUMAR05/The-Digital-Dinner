import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';

const CartPage = () => {
  const { items, totalItems } = useCart();

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="mb-6">Add some delicious items from our menu to get started.</p>
        <Link to="/menu" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item._id || item.id} item={item} />
          ))}
        </div>
        
        <div className="md:col-span-1">
          {/* CartSummary now gets data from context, no props needed */}
          <CartSummary />
          
          <div className="mt-4">
            <Link 
              to="/checkout" 
              className="block w-full bg-green-500 text-center text-white py-3 rounded hover:bg-green-600"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;