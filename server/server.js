const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectMongoDB, connectPostgreSQL } = require('./config/db');

// Load environment variables
dotenv.config();

// Import routes
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to databases
connectMongoDB();
connectPostgreSQL();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Add this debugging line to show all registered routes
console.log('Registered routes:');
app._router.stack.forEach(function(r) {
  if (r.route && r.route.path) {
    Object.keys(r.route.methods).forEach(method => {
      console.log(`${method.toUpperCase()} ${r.route.path}`);
    });
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('Digital Diner API is running...');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;