import React from 'react';
import { useCart } from '../../context/CartContext';
// Import a default placeholder image or create a component for it
import defaultImage from '../../assets/placeholder.png'; // Create this file or adjust path as needed

const MenuItem = ({ item }) => {
    const { addItem } = useCart();
    
    // Default image source - use this directly instead of trying to load a 3rd party one
    const fallbackImageSrc = defaultImage; 
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
                {/* Use standard pattern for fallback images */}
                <img 
                    src={item.imageUrl || fallbackImageSrc}
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    // Simple onError that doesn't cause infinite loops
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