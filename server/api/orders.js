const router = require('express').Router();
const {
  models: { User, Order, Animal, OrderAnimal },
} = require('../db');
const { requireToken } = require('./gateKeepingMiddleware');
module.exports = router;

router.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const currUser = req.params.userId;
    const orders = await Order.findAll({
      where: {
        userId: currUser,
      },
      include: Animal,
      through: { OrderAnimal },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/:orderId', requireToken, async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        id: req.params.orderId,
        userId: req.params.userId,
      },
      include: Animal,
      through: { OrderAnimal },
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.post('/add/:userId', async (req, res, next) => {
  try {
    const details = req.body;
    const newOrder = await Order.create(details);
    if (req.params.userId) {
      const user = await User.findByPk(req.params.userId);
      await user.addOrder(newOrder);
    }
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
});

router.post('/animals/:cartId/:animalId/:quantity', async (req, res, next) => {
  try {
    const quantity = req.params.quantity;
    const order = await Order.findByPk(req.params.cartId);
    const animal = await Animal.findByPk(req.params.animalId);
    await order.addAnimal(animal, {
      through: { quantity: req.params.quantity },
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});
