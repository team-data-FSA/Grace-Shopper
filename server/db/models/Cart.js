const Sequelize = require('sequelize');
const db = require('../db');

const CartModel = db.define('cartModel', {});

module.exports = CartModel;
