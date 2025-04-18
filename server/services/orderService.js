const { Order } = require('../models/postgresql/order');
const { User } = require('../models/postgresql/user');

// Create a new order
const createOrder = async (orderData) => {
    try {
        const { userInfo, cartItems } = orderData;

        // Check if user exists, if not create a new user
        let user = await User.findOne({ where: { phone: userInfo.phone } });
        if (!user) {
            user = await User.create({ name: userInfo.name, phone: userInfo.phone });
        }

        // Create the order
        const order = await Order.create({
            userId: user.id,
            items: cartItems,
            total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        });

        return order;
    } catch (error) {
        throw new Error('Error creating order: ' + error.message);
    }
};

// Fetch orders by user phone number
const getOrdersByPhone = async (phone) => {
    try {
        const user = await User.findOne({ where: { phone } });
        if (!user) {
            return [];
        }

        const orders = await Order.findAll({ where: { userId: user.id } });
        return orders;
    } catch (error) {
        throw new Error('Error fetching orders: ' + error.message);
    }
};

module.exports = {
    createOrder,
    getOrdersByPhone,
};