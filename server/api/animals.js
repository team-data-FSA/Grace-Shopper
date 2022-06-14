const router = require('express').Router()
const { models: { Animal }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const animals = await Animal.findAll()
    res.json(animals)
  } catch (err) {
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    res.json(animal);
  } catch(err) {
    next(err);
  }
})
