const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const fs = require('fs');
const { parse } = require('csv-parse');
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

// Path to CSV file - note the name is menu_items.csv, not menu-items.csv
const csvFilePath = path.join(__dirname, '../data/menu_items.csv');

// Helper function to clean boolean values from CSV
const parseBooleanValue = (value) => {
  if (typeof value === 'string') {
    const lowercased = value.toLowerCase().trim();
    return lowercased === 'true' || lowercased === 'yes';
  }
  return Boolean(value);
};

// Helper function to extract base menu item name without the numbering
const extractBaseName = (fullName) => {
  // Extract the base name by removing the "#N" part
  const match = fullName.match(/^(.*?)\s*#\d+$/);
  return match ? match[1].trim() : fullName.trim();
};

// Parse CSV file and import data
async function importMenuItems() {
  try {
    console.log(`Reading CSV file from ${csvFilePath}`);
    
    // Check if file exists first
    if (!fs.existsSync(csvFilePath)) {
      console.error(`CSV file not found at ${csvFilePath}`);
      process.exit(1);
    }

    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    console.log(`CSV file successfully read, length: ${fileContent.length} characters`);
    
    // Remove any potential BOM and CSV header comment
    const cleanedContent = fileContent
      .replace(/^\uFEFF/, '') // Remove BOM if present
      .replace(/^\/\/.*?\r?\n/, ''); // Remove comment line
    
    const records = [];
    const uniqueBaseNames = new Set();
    
    // Parse the CSV content
    const parser = parse(cleanedContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
    
    for await (const record of parser) {
      const baseName = extractBaseName(record.name);
      
      // Only process each unique base name once
      if (!uniqueBaseNames.has(baseName)) {
        uniqueBaseNames.add(baseName);
        
        // Transform CSV data to match our schema
        const menuItem = {
          name: baseName,
          description: record.description,
          price: parseFloat(record.price),
          category: record.category,
          imageUrl: record.imageUrl,
          nutritionInfo: {
            calories: parseInt(record.calories) || 0,
            protein: parseInt(record.protein) || 0,
            carbs: parseInt(record.carbs) || 0,
            fat: parseInt(record.fat) || 0,
            allergens: record.allergens ? 
              record.allergens.split(',').map(item => item.trim()) : []
          },
          ingredients: record.ingredients ? 
            record.ingredients.split(',').map(item => item.trim()) : [],
          dietaryInfo: {
            isVegetarian: parseBooleanValue(record.isVegetarian),
            isVegan: parseBooleanValue(record.isVegan),
            isGlutenFree: parseBooleanValue(record.isGlutenFree)
          },
          isFeatured: parseBooleanValue(record.isFeatured),
          preparationTime: parseInt(record.preparationTime) || 15,
          isAvailable: true
        };
        
        records.push(menuItem);
        console.log(`Added unique menu item: ${baseName}`);
      }
    }

    console.log(`Processed ${records.length} unique menu items`);

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');
    
    // Insert new menu items
    const result = await MenuItem.insertMany(records);
    console.log(`Successfully imported ${result.length} menu items`);
    
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