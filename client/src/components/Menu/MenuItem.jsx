import React from 'react';
import { useCart } from '../../context/CartContext';
// import noImage from '../../assets/no-image.png'; // Import your local image

const MenuItem = ({ item }) => {
    const { addItem } = useCart();

    // Use local fallback image
    const fallbackImageSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23f1f1f1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23777777'%3ENo Image%3C/text%3E%3C/svg%3E";

    // Dietary and nutrition labels
    const dietaryLabels = [];
    if (item.dietaryInfo?.isVegetarian) dietaryLabels.push('Vegetarian');
    if (item.dietaryInfo?.isVegan) dietaryLabels.push('Vegan');
    if (item.dietaryInfo?.isGlutenFree) dietaryLabels.push('Gluten Free');

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200 overflow-hidden flex flex-col h-full border border-gray-100">
            <div className="relative">
                <img
                    src={item.imageUrl || fallbackImageSrc}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                    onError={e => { e.target.onerror = null; e.target.src = fallbackImageSrc; }}
                />
                {item.isFeatured && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded shadow">
                        Featured
                    </span>
                )}
            </div>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <span className="text-green-600 text-lg font-semibold">${item.price?.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                    {dietaryLabels.map(label => (
                        <span key={label} className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full border border-green-300">{label}</span>
                    ))}
                    {item.nutritionInfo?.allergens?.length > 0 && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full border border-red-300">
                            Allergens: {item.nutritionInfo.allergens.join(', ')}
                        </span>
                    )}
                </div>
                <div className="mb-2">
                    <span className="block text-xs text-gray-500 mb-1 font-semibold">Ingredients:</span>
                    <span className="text-xs text-gray-700">{item.ingredients?.join(', ')}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                    <span>Calories: {item.nutritionInfo?.calories}</span>
                    <span>Protein: {item.nutritionInfo?.protein}g</span>
                    <span>Carbs: {item.nutritionInfo?.carbs}g</span>
                    <span>Fat: {item.nutritionInfo?.fat}g</span>
                </div>
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{item.preparationTime} min</span>
                    <button
                        onClick={() => addItem(item)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded-full shadow transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;