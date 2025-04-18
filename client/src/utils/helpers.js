const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/; // Simple regex for 10-digit phone numbers
    return phoneRegex.test(phoneNumber);
};

export { formatCurrency, calculateTotalPrice, validatePhoneNumber };