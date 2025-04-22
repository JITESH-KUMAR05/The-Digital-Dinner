const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const mongoose = require('mongoose');
const MenuItem = require('../models/mongodb/menuItem');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// CSV file paths
const csvFiles = [
  path.join(__dirname, '../data/menu-items.csv'),
  path.join(__dirname, '../data/indian-menu.csv')
];

// Helper function to convert string to boolean
const parseBoolean = (value) => {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return Boolean(value);
};

// Parse CSV file and return menu items
function parseCsvFile(filePath) {
  try {
    console.log(`Reading CSV file from ${filePath}`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return [];
    }
    
    // Read CSV file
    let fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Remove comment line if it exists
    if (fileContent.startsWith('//')) {
      fileContent = fileContent.split('\n').slice(1).join('\n');
    }
    
    // Parse CSV
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
    
    console.log(`Parsed records from ${path.basename(filePath)}:`);
    console.log(records); // Log the parsed records for debugging
    
    console.log(`Found ${records.length} menu items in ${path.basename(filePath)}`);
    
    // Transform CSV data to match our schema
    return records.map(record => ({
      name: record.name?.trim(),
      description: record.description?.trim(),
      price: parseFloat(record.price),
      category: record.category?.trim(),
      imageUrl: record.imageUrl?.trim(),
      nutritionInfo: {
        calories: parseInt(record.calories) || 0,
        protein: parseInt(record.protein) || 0,
        carbs: parseInt(record.carbs) || 0,
        fat: parseInt(record.fat) || 0,
        allergens: record.allergens ? 
          (record.allergens === 'None' ? [] : record.allergens.split(',').map(a => a.trim())) : []
      },
      ingredients: record.ingredients ? record.ingredients.split(',').map(i => i.trim()) : [],
      dietaryInfo: {
        isVegetarian: parseBoolean(record.isVegetarian),
        isVegan: parseBoolean(record.isVegan),
        isGlutenFree: parseBoolean(record.isGlutenFree)
      },
      isFeatured: parseBoolean(record.isFeatured),
      preparationTime: parseInt(record.preparationTime) || 15,
      isAvailable: true
    }));
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return [];
  }
}

// Import menu items
async function importMenuItems() {
  try {
    let allMenuItems = [];
    
    // Parse all CSV files
    for (const csvFile of csvFiles) {
      const menuItems = parseCsvFile(csvFile);
      allMenuItems = [...allMenuItems, ...menuItems];
    }
    
    console.log(`Total menu items to process: ${allMenuItems.length}`);
    
    // Validate and filter out invalid items
    const validMenuItems = allMenuItems.filter(item => {
      if (!item.name || !item.description || !item.price || !item.category) {
        console.warn(`Skipping invalid item: ${JSON.stringify(item)}`);
        return false;
      }
      return true;
    });
    
    console.log(`Valid menu items to import: ${validMenuItems.length}`);
    
    // Get existing menu items
    const existingItems = await MenuItem.find({}, 'name');
    const existingNames = existingItems.map(item => item.name);
    console.log(`Found ${existingNames.length} existing items in database`);
    
    // Filter out items that already exist
    const newItems = validMenuItems.filter(item => !existingNames.includes(item.name));
    console.log(`Found ${newItems.length} new items to import`);
    
    if (newItems.length === 0) {
      console.log('No new items to import');
      mongoose.disconnect();
      return;
    }
    
    // Upsert menu items
    for (const item of validMenuItems) {
      await MenuItem.updateOne(
        { name: item.name }, // match by name
        { $set: item },      // update all fields
        { upsert: true }     // insert if not exists
      );
    }
    console.log(`Upserted ${validMenuItems.length} menu items`);
    
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error importing menu items:', error);
    mongoose.disconnect();
  }
}

// Run the import function
importMenuItems();