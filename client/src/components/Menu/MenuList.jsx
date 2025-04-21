import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import { fetchMenuItems } from '../../services/api';

const MenuList = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getMenuItems = async () => {
            try {
                const items = await fetchMenuItems();
                setMenuItems(items);
                
                // Extract unique categories
                const uniqueCategories = [...new Set(items.map(item => item.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getMenuItems();
    }, []);

    if (loading) return <div className="text-center py-8">Loading menu items...</div>;
    if (error) return <div className="text-center text-red-500 py-8">Error: {error}</div>;

    return (
        <div className="menu-list">
            {categories.map(category => (
                <div key={category} className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuItems
                            .filter(item => item.category === category)
                            .map(item => (
                                <MenuItem key={item._id || item.id} item={item} />
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuList;