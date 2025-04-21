import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust the base URL as needed

// Fetch all menu items
export const fetchMenuItems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/menu`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching menu items');
    }
};

// Fetch a single menu item by ID
export const fetchMenuItemById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/menu/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching menu item');
    }
};

// Create a new order
export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating order');
    }
};

// Fetch orders by phone number
export const fetchOrdersByPhone = async (phoneNumber) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/phone/${phoneNumber}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching orders');
    }
};

// If you need a generic fetchOrders function that OrderHistory.jsx is importing:
export const fetchOrders = async (phoneNumber) => {
    // This just calls the more specific function
    return fetchOrdersByPhone(phoneNumber);
};