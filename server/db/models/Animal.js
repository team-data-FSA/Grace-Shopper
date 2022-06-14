const Sequelize = require('sequelize');
const db = require('../db');

const Animal = db.define('animal', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  latinName: {
    type: Sequelize.STRING,
  },
  animalType: {
    type: Sequelize.STRING,
  },
  diet: {
    type: Sequelize.STRING,
  },
  habitat: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
  },
  lifeSpan: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  picture: {
    type: Sequelize.STRING,
  },
});

module.exports = Animal;
