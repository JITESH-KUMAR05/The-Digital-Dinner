import React from 'react';
import { useCart } from '../../context/CartContext';

const MenuItem = ({ item }) => {
    const { addItem } = useCart();
    
    // Use a data URL instead of importing an image file
    const fallbackImageSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f1f1f1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23777777'%3ENo Image%3C/text%3E%3C/svg%3E";
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
                <img 
                    src={item.imageUrl || fallbackImageSrc}
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = fallbackImageSrc;
                    }}
                />
            </div>
            
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <span className="font-bold text-green-600">${item.price?.toFixed(2)}</span>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm h-16 overflow-hidden">
                    {item.description}
                </p>
                
                <button 
                    onClick={() => addItem(item)}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default MenuItem;