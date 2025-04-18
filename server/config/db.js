const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// MongoDB Connection
const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// PostgreSQL Connection
// This is the important part - we need to create a properly configured Sequelize instance
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  define: {  // Add this define object
    timestamps: true,
    underscored: true
  },
  logging: false
});

const connectPostgreSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connection has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log('PostgreSQL models synchronized');
  } catch (error) {
    console.error('Unable to connect to PostgreSQL database:', error);
    process.exit(1);
  }
};

module.exports = { connectMongoDB, connectPostgreSQL, sequelize };