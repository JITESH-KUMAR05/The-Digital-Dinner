import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import { fetchMenuItems } from '../../services/api';

const MenuList = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMenuItems = async () => {
            try {
                const items = await fetchMenuItems();
                setMenuItems(items);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getMenuItems();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="menu-list">
            {menuItems.map(item => (
                <MenuItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default MenuList;