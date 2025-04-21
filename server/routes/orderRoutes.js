const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create a new order
router.post('/', orderController.createOrder);

// Route to fetch orders based on user identifier (phone number)
router.get('/phone/:phoneNumber', orderController.getOrdersByPhoneNumber);

module.exports = router;