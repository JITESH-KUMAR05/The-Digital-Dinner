import React, { useEffect, useState } from 'react';
import MenuList from '../components/Menu/MenuList';
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

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div>
            <h1>Welcome to The Digital Diner</h1>
            <MenuList items={menuItems} />
        </div>
    );
};

export default HomePage;