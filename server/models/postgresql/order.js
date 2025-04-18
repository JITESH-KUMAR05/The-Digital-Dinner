const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');  // Make sure to destructure sequelize

class Order extends Model {}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,  // This needs to be the sequelize instance from db.js
  modelName: 'Order',
  tableName: 'orders',
  timestamps: true  // This will use the timestamps defined in the sequelize instance
});

module.exports = Order;