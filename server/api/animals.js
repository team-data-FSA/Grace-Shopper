const router = require('express').Router();
const {
  models: { Animal },
} = require('../db');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const animals = await Animal.findAll();
    res.json(animals);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    res.json(animal);
  } catch (err) {
    next(err);
  }
});

// API Route to add animals to database
router.post('/add', requireToken, isAdmin, async (req, res, next) => {
  try {
    const newAnimal = await Animal.create(req.body);
    res.json(newAnimal);
  } catch (error) {
    next(error);
  }
});

// API Route to edit animals on the database
router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    res.json(await animal.update(req.body));
  } catch (error) {
    next(error);
  }
});

// API Route to delete animals on the database
router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    await animal.destroy();
    res.json(animal);
  } catch (error) {
    next(error);
  }
});
