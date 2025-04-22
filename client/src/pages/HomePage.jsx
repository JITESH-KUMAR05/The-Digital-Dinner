import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../components/Menu/MenuItem';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { fetchMenuItems } from '../services/api';

const HomePage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Featured categories to show on the home page - removed Indian if it doesn't exist
    const featuredCategories = ['Appetizers', 'Main Courses', 'Desserts', 'Drinks'];

    useEffect(() => {
        const getMenuItems = async () => {
            try {
                const items = await fetchMenuItems();
                setMenuItems(items);
                
                // Get unique categories
                const uniqueCategories = [...new Set(items.map(item => item.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                setError('Failed to fetch menu items');
            } finally {
                setLoading(false);
            }
        };

        getMenuItems();
    }, []);

    // Get featured items for a specific category
    const getCategoryItems = (category) => {
        return menuItems
            .filter(item => item.category === category)
            .slice(0, 3); // Show max 3 items per category on homepage
    };

    return (
        <div className="home-page max-w-7xl mx-auto">
            <div className="text-center mb-10 px-4">
                <h1 className="text-4xl font-bold mb-4">Welcome to The Digital Diner</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Browse our delicious menu and place your order online for convenient pickup
                </p>
                <Link 
                    to="/menu" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-lg transition-colors"
                >
                    View Full Menu
                </Link>
            </div>

            {loading ? (
                <div className="my-8 text-center">
                    <Loading message="Loading menu items..." />
                </div>
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <>
                    {/* Featured items section */}
                    <div className="mb-12 px-4">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Featured Items</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {menuItems
                                .filter(item => item.isFeatured)
                                .slice(0, 8) // Show max 8 featured items
                                .map(item => (
                                    <MenuItem key={item._id} item={item} />
                                ))
                            }
                        </div>
                    </div>
                    
                    {/* Category sections */}
                    {featuredCategories.map(category => {
                        const items = getCategoryItems(category);
                        if (items.length === 0) return null;
                        
                        return (
                            <div key={category} className="mb-10 px-4">
                                <div className="flex justify-between items-center mb-4 border-b pb-2">
                                    <h2 className="text-2xl font-bold">{category}</h2>
                                    <Link to={`/menu?category=${category}`} className="text-blue-600 hover:text-blue-800">
                                        See all →
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {items.map(item => (
                                        <MenuItem key={item._id} item={item} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    
                    <div className="text-center my-12">
                        <Link to="/menu" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full text-lg transition-colors">
                            Browse Complete Menu
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;