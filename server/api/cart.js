const router = require('express').Router();
const {
  models: { CartModel },
} = require('../db');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const carts = await CartModel.findAll();
    res.json(carts);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await CartModel.findOne({
      where: { userId: req.params.userId },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});
