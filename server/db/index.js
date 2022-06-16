const db = require('./db');
const Sequelize = require('sequelize');

const User = require('./models/User');
const Animal = require('./models/Animal');
const CartModel = require('./models/Cart');
const Order = require('./models/Order');

User.hasOne(CartModel);
CartModel.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

const CartAnimals = db.define('CartAnimals', {
  quantity: Sequelize.INTEGER,
});
Animal.belongsToMany(CartModel, { through: CartAnimals });
CartModel.belongsToMany(Animal, { through: CartAnimals });

const OrderAnimals = db.define('OrderAnimals', {
  quantity: Sequelize.INTEGER,
});
Animal.belongsToMany(Order, { through: OrderAnimals });
Order.belongsToMany(Animal, { through: OrderAnimals });

module.exports = {
  db,
  models: {
    User,
    Animal,
    CartModel,
    Order,
    OrderAnimals,
  },
};
