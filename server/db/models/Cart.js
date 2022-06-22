const Sequelize = require('sequelize');
const db = require('../db');

const CartModel = db.define('cartModel', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: { msg: 'Please enter a valid email address' },
    },
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

module.exports = CartModel;
