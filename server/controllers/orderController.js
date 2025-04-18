const Order = require('../models/postgresql/order');
const User = require('../models/postgresql/user');

// Create a new order
exports.createOrder = async (req, res) => {
    const { name, phoneNumber, items, totalPrice } = req.body;

    try {
        // Create order
        const order = await Order.create({
            name,
            phoneNumber,
            items,
            totalPrice
        });

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
};

// Fetch orders by phone number
exports.getOrdersByPhoneNumber = async (req, res) => {
    const { phoneNumber } = req.params;

    try {
        const orders = await Order.findAll({ where: { phoneNumber } });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};