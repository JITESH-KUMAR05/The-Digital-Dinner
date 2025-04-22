const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const MenuItem = require('../models/mongodb/menuItem');

async function verifyMenuItems() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    
    const count = await MenuItem.countDocuments();
    console.log(`Total menu items: ${count}`);
    
    const items = await MenuItem.find().select('name category price isFeatured');
    console.log('Menu items:');
    items.forEach(item => {
      console.log(`- ${item.name} (${item.category}) - $${item.price} ${item.isFeatured ? '★' : ''}`);
    });
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    mongoose.disconnect();
  }
}

verifyMenuItems();