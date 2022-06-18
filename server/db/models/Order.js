const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.DECIMAL,
  },
  datePlaced: {
    type: Sequelize.DATE,
  },
  dateShipped: {
    type: Sequelize.DATE,
  },
  isFullfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  shippingAddress: {
    type: Sequelize.STRING,
  },
});

module.exports = Order;
