import React from 'react';
import { useCart } from '../../context/CartContext';

const MenuItem = ({ item }) => {
    const { addItem } = useCart();
    
    // Use a data URL for fallback image
    const fallbackImageSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f1f1f1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23777777'%3ENo Image%3C/text%3E%3C/svg%3E";
    
    // Format dietary info
    const getDietaryLabels = () => {
        const labels = [];
        if (item.dietaryInfo?.isVegetarian) labels.push('Veg');
        if (item.dietaryInfo?.isVegan) labels.push('Vegan');
        if (item.dietaryInfo?.isGlutenFree) labels.push('GF');
        return labels;
    };
    
    const dietaryLabels = getDietaryLabels();
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200">
            <div className="relative h-32 overflow-hidden">
                <img 
                    src={item.imageUrl || fallbackImageSrc}
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImageSrc;
                    }}
                    loading="lazy"
                />
                {/* Featured badge */}
                {item.isFeatured && (
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs px-1.5 py-0.5 m-1 rounded">
                        Featured
                    </div>
                )}
                
                {/* Dietary info badges */}
                {dietaryLabels.length > 0 && (
                    <div className="absolute top-0 left-0 flex gap-1 m-1">
                        {dietaryLabels.map(label => (
                            <span key={label} className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                                {label}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="p-3">
                <div className="flex justify-between items-start">
                    <h3 className="text-md font-semibold truncate max-w-[70%]">{item.name}</h3>
                    <span className="font-bold text-green-600 whitespace-nowrap">${item.price?.toFixed(2)}</span>
                </div>
                
                <p className="text-xs text-gray-600 mt-1 h-8 overflow-hidden line-clamp-2">
                    {item.description}
                </p>
                
                <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                        {item.preparationTime} min
                    </span>
                    
                    <button 
                        onClick={() => addItem(item)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded-full transition-colors flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;