const router = require('express').Router();
const {
  models: { Animal, CartModel, CartAnimal },
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
      include: Animal,
      through: { CartAnimal },
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.put('/add/:userId/:animalId/:quantity', async (req, res, next) => {
  try {
    let cart = await CartModel.findOne({
      where: { userId: req.params.userId },
      include: Animal,
      through: { CartAnimal },
    });

    const currentAnimals = cart.animals;
    let quantity = parseInt(req.params.quantity);

    for (let i = 0; i < currentAnimals.length; i++) {
      if (currentAnimals[i].id == req.params.animalId) {
        quantity += currentAnimals[i].CartAnimal.quantity;
        console.log(
          'found quan',
          quantity,
          currentAnimals[i].CartAnimal.quantity
        );
      }
    }

    const animal = await Animal.findByPk(req.params.animalId);

    await cart.addAnimal(animal, {
      through: { quantity: quantity },
    });
    cart = await CartModel.findOne({
      where: { userId: req.params.userId },
      include: Animal,
      through: { CartAnimal },
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

router.put('/edit/:userId/:animalId/:quantity', async (req, res, next) => {
  try {
    let cart = await CartModel.findOne({
      where: { userId: req.params.userId },
    });
    const animal = await Animal.findByPk(req.params.animalId);

    // Remove current associations, therefore removing the associated quantity
    // If there is a better way to update quantity directly that would be more efficient
    await cart.removeAnimal(animal);

    //Add back association with updated quantity if quantity>0
    if (req.params.quantity > 0) {
      await cart.addAnimal(animal, {
        through: { quantity: req.params.quantity },
      });
    }
    cart = await CartModel.findOne({
      where: { userId: req.params.userId },
      include: Animal,
      through: { CartAnimal },
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});
