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
  addressLine1: {
    type: Sequelize.STRING,
  },
  addressLine2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.BIGINT,
  },
  country: {
    type: Sequelize.STRING,
  },
});

module.exports = Order;
