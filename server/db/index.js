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

const CartAnimal = db.define('CartAnimal', {
  quantity: Sequelize.INTEGER,
});
Animal.belongsToMany(CartModel, { through: CartAnimal });
CartModel.belongsToMany(Animal, { through: CartAnimal });

const OrderAnimal = db.define('OrderAnimal', {
  quantity: Sequelize.INTEGER,
});
Animal.belongsToMany(Order, {
  through: OrderAnimal,
});
Order.belongsToMany(Animal, { through: OrderAnimal });

module.exports = {
  db,
  models: {
    User,
    Animal,
    CartModel,
    Order,
    OrderAnimal,
  },
};
