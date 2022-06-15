const router = require('express').Router();
const {
  models: { Animal },
} = require('../db');
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
router.post('/', async (req, res, next) => {
  try {
    const newAnimal = await Animal.create(req.body);
    res.json(newAnimal);
  } catch (error) {
    next(error);
  }
});

// API Route to edit animals on the database
router.put('/:id', async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    res.json(await animal.update(req.body));
  } catch (error) {
    next(error);
  }
});
