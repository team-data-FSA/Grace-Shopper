const router = require('express').Router();
const {
  models: { Order, Animal, OrderAnimal },
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

router.post('/:userId/add', requireToken, async (req, res, next) => {
  try {
    const details = req.body;
    const newOrder = await Order.create(
      { userId: req.params.userId}, details
    );
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
});
