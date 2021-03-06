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

const simplifyCart = (cart) => {
  let cartCount = 0;
  let total = 0;

  if (cart.animals) {
    for (let i = 0; i < cart.animals.length; i++) {
      cartCount += cart.animals[i].CartAnimal.quantity;
      total += cart.animals[i].CartAnimal.quantity * cart.animals[i].price;
    }
  }

  const animals = cart.dataValues.animals.map((animal) => {
    let newAnimal = {};
    newAnimal.quantity = animal.CartAnimal.quantity;
    delete animal.CartAnimal;
    newAnimal.animal = animal;
    return newAnimal;
  });

  const firstName = cart.firstName;
  const lastName = cart.lastName;
  const email = cart.email;
  const addressLine1 = cart.addressLine1;
  const addressLine2 = cart.addressLine2;
  const city = cart.city;
  const state = cart.state;
  const zip = cart.zip;
  const country = cart.country;
  const cardName = cart.cardName;
  const cardNumber = cart.cardNumber;
  const expDate = cart.expDate;
  const cvv = cart.cvv;
  const newCart = {
    animals,
    cartCount,
    total,
    firstName,
    lastName,
    email,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    country,
    cardName,
    cardNumber,
    expDate,
    cvv,
  };

  return newCart;
};

router.get('/:userId', async (req, res, next) => {
  try {
    let cart = await CartModel.findOne({
      where: { userId: req.params.userId },
      include: Animal,
      through: { CartAnimal },
    });
    cart = simplifyCart(cart);

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
    cart = simplifyCart(cart);

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
    cart = simplifyCart(cart);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

router.put('/editDetails/:userId', async (req, res, next) => {
  try {
    let cart = await CartModel.findOne({
      where: { userId: req.params.userId },
    });
    res.send(await cart.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/reset/:userId', async (req, res, next) => {
  try {
    const cart = await CartModel.findOne({
      where: { userId: req.params.userId },
      include: Animal,
      through: { CartAnimal },
    });

    const currentAnimals = cart.animals;

    for (let i = 0; i < currentAnimals.length; i++) {
      let currAnimal = await Animal.findByPk(currentAnimals[i].id);
      await cart.removeAnimal(currAnimal);
    }
    const simplifiedCart = simplifyCart(cart);
    res.send(simplifiedCart);
  } catch (error) {
    next(error);
  }
});
