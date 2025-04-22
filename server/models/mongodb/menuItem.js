const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Appetizers', 'Main Courses', 'Sides', 'Desserts', 'Drinks', 'Specials']
  },
  imageUrl: {
    type: String,
    default: ''  // Default empty, your MenuItem component handles fallback
  },
  nutritionInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    allergens: [String]
  },
  ingredients: {
    type: [String],
    default: []
  },
  dietaryInfo: {
    isVegetarian: {
      type: Boolean,
      default: false
    },
    isVegan: {
      type: Boolean,
      default: false
    },
    isGlutenFree: {
      type: Boolean,
      default: false
    }
  },
  ratings: {
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    numberOfRatings: {
      type: Number,
      default: 0
    }
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  preparationTime: {
    type: Number,  // In minutes
    default: 15
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt fields
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;

const menuItems = [
  {
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheddar cheese, lettuce, tomato, and our special sauce on a toasted brioche bun.",
    price: 9.99,
    category: "Main Courses",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutritionInfo: {
      calories: 650,
      protein: 35,
      carbs: 40,
      fat: 35,
      allergens: ["Dairy", "Gluten"]
    },
    ingredients: ["Beef patty", "Cheddar cheese", "Lettuce", "Tomato", "Special sauce", "Brioche bun"],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false
    },
    isFeatured: true,
    preparationTime: 12
  },
  {
    name: "Garden Veggie Wrap",
    description: "Fresh mixed greens, cucumber, bell peppers, tomatoes, and avocado with hummus in a spinach wrap.",
    price: 7.99,
    category: "Main Courses",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutritionInfo: {
      calories: 420,
      protein: 12,
      carbs: 45,
      fat: 22,
      allergens: ["Gluten"]
    },
    ingredients: ["Spinach wrap", "Mixed greens", "Cucumber", "Bell peppers", "Tomatoes", "Avocado", "Hummus"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false
    },
    isFeatured: true,
    preparationTime: 8
  },
  {
    name: "Sweet Potato Fries",
    description: "Crispy sweet potato fries seasoned with sea salt and served with chipotle aioli.",
    price: 4.99,
    category: "Sides",
    imageUrl: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutritionInfo: {
      calories: 320,
      protein: 4,
      carbs: 45,
      fat: 15,
      allergens: ["Eggs"]
    },
    ingredients: ["Sweet potato", "Vegetable oil", "Sea salt", "Chipotle aioli"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true
    },
    isFeatured: false,
    preparationTime: 10
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
    price: 6.99,
    category: "Desserts",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutritionInfo: {
      calories: 550,
      protein: 7,
      carbs: 65,
      fat: 30,
      allergens: ["Dairy", "Eggs", "Gluten"]
    },
    ingredients: ["Chocolate", "Butter", "Sugar", "Eggs", "Flour", "Vanilla ice cream"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false
    },
    isFeatured: true,
    preparationTime: 15
  },
  {
    name: "Mango Tango Smoothie",
    description: "Refreshing smoothie with mango, pineapple, banana, and orange juice.",
    price: 5.49,
    category: "Drinks",
    imageUrl: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutritionInfo: {
      calories: 220,
      protein: 2,
      carbs: 52,
      fat: 0,
      allergens: []
    },
    ingredients: ["Mango", "Pineapple", "Banana", "Orange juice"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true
    },
    isFeatured: false,
    preparationTime: 5
  },
  {
    name: "Buffalo Chicken Wings",
    description: "Crispy chicken wings tossed in our signature buffalo sauce, served with celery and blue cheese dipping sauce.",
    price: 10.99,
    category: "Appetizers",
    imageUrl: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutritionInfo: {
      calories: 480,
      protein: 28,
      carbs: 5,
      fat: 35,
      allergens: ["Dairy"]
    },
    ingredients: ["Chicken wings", "Buffalo sauce", "Celery", "Blue cheese dipping sauce"],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true
    },
    isFeatured: true,
    preparationTime: 18
  },
  {
    name: "Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil on our house-made thin crust.",
    price: 12.99,
    category: "Main Courses",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutritionInfo: {
      calories: 720,
      protein: 24,
      carbs: 80,
      fat: 28,
      allergens: ["Dairy", "Gluten"]
    },
    ingredients: ["Pizza dough", "Fresh mozzarella", "Tomatoes", "Basil", "Olive oil"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false
    },
    isFeatured: true,
    preparationTime: 20
  },
  {
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, Parmesan cheese, house-made croutons, and our creamy Caesar dressing.",
    price: 8.99,
    category: "Appetizers",
    imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutritionInfo: {
      calories: 380,
      protein: 12,
      carbs: 15,
      fat: 30,
      allergens: ["Dairy", "Eggs", "Gluten"]
    },
    ingredients: ["Romaine lettuce", "Parmesan cheese", "Croutons", "Caesar dressing"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false
    },
    isFeatured: false,
    preparationTime: 7
  },
  {
    name: "Garlic Bread",
    description: "Fresh baked bread with garlic butter and herbs.",
    price: 3.99,
    category: "Sides",
    imageUrl: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutritionInfo: {
      calories: 300,
      protein: 6,
      carbs: 40,
      fat: 15,
      allergens: ["Dairy", "Gluten"]
    },
    ingredients: ["Bread", "Garlic", "Butter", "Italian herbs"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false
    },
    isFeatured: false,
    preparationTime: 8
  },
  {
    name: "Tiramisu",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
    price: 7.99,
    category: "Desserts",
    imageUrl: "https://images.unsplash.com/photo-1571877899582-cd563cb27062?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutritionInfo: {
      calories: 420,
      protein: 8,
      carbs: 45,
      fat: 20,
      allergens: ["Dairy", "Eggs", "Gluten"]
    },
    ingredients: ["Ladyfingers", "Espresso", "Mascarpone", "Cocoa powder"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false
    },
    isFeatured: false,
    preparationTime: 0
  },
  {
    name: "Iced Coffee",
    description: "Cold brewed coffee served over ice with your choice of milk and sweetener.",
    price: 3.99,
    category: "Drinks",
    imageUrl: "https://images.unsplash.com/photo-1553909489-cd47e0907980?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutritionInfo: {
      calories: 120,
      protein: 2,
      carbs: 24,
      fat: 1,
      allergens: ["Dairy"]
    },
    ingredients: ["Coffee", "Ice", "Milk"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true
    },
    isFeatured: false,
    preparationTime: 3
  },
  {
    name: "Chicken Quesadilla",
    description: "Grilled flour tortilla filled with seasoned chicken, melted cheese, peppers, and onions.",
    price: 9.49,
    category: "Appetizers",
    imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    nutritionInfo: {
      calories: 580,
      protein: 35,
      carbs: 30,
      fat: 32,
      allergens: ["Dairy", "Gluten"]
    },
    ingredients: ["Flour tortilla", "Chicken", "Cheddar cheese", "Bell peppers", "Onions"],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false
    },
    isFeatured: false,
    preparationTime: 12
  }
];