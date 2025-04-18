const { body, validationResult } = require('express-validator');

const validateOrder = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('phone').isString().notEmpty().withMessage('Phone number is required'),
    body('cart').isArray().withMessage('Cart must be an array').notEmpty().withMessage('Cart cannot be empty'),
];

const validateMenuItem = [
    body('name').isString().notEmpty().withMessage('Menu item name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').isString().notEmpty().withMessage('Category is required'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateOrder,
    validateMenuItem,
    validateRequest,
};