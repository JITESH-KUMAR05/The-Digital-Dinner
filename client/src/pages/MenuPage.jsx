import React, { useState } from 'react';
import MenuList from '../components/Menu/MenuList';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const MenuPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    
    return (
        <div className="menu-page">
            <h1 className="text-3xl font-bold mb-6 text-center">Our Menu</h1>
            
            <p className="text-gray-600 max-w-2xl mx-auto text-center mb-8">
                Browse our delicious offerings, prepared with the freshest ingredients. 
                Add your favorites to the cart and place your order for pickup.
            </p>
            
            <MenuList />
        </div>
    );
};

export default MenuPage;