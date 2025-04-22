import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../components/Menu/MenuItem';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { fetchMenuItems } from '../services/api';

const HomePage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMenuItems = async () => {
            try {
                const items = await fetchMenuItems();
                setMenuItems(items);
            } catch (err) {
                setError('Failed to fetch menu items');
            } finally {
                setLoading(false);
            }
        };

        getMenuItems();
    }, []);

    return (
        <div className="home-page">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">Welcome to The Digital Diner</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Browse our delicious menu and place your order online for convenient pickup
                </p>
                <Link 
                    to="/menu" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-lg"
                >
                    View Full Menu
                </Link>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Featured Items</h2>
                
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-gray-100 animate-pulse h-80 rounded-lg"></div>
                        ))}
                    </div>
                ) : error ? (
                    <ErrorMessage message={error} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuItems.map(item => (
                            <MenuItem key={item._id} item={item} />
                        ))}
                    </div>
                )}
            </div>
            
            <div className="text-center mt-6">
                <Link to="/menu" className="text-blue-600 hover:text-blue-800">
                    See all menu items →
                </Link>
            </div>
        </div>
    );
};

export default HomePage;