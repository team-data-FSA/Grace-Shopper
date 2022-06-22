const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  total: {
    type: Sequelize.DECIMAL,
  },
  datePlaced: {
    type: Sequelize.DATE,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: { msg: 'Please enter a valid email address' },
    },
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
  cardName: {
    type: Sequelize.STRING,
  },
  cardNumber: {
    type: Sequelize.STRING,
  },
  expDate: {
    type: Sequelize.STRING,
  },
  cvv: {
    type: Sequelize.STRING,
  },
});

module.exports = Order;
