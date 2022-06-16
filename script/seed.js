'use strict';

const {
  db,
  models: { User, Animal, CartModel, Order, OrderAnimal },
} = require('../server/db');
const fs = require('fs');
const animalData = require('./seedoutput');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  let animals = [];

  // creating animals
  for (let i = 0; i < animalData.length; i++) {
    const animal = animalData[i];
    animals.push(
      await Animal.create({
        name: animal.name,
        latinName: animal.latin_name,
        animalType: animal.animal_type,
        diet: animal.diet,
        habitat: animal.habitat,
        location: animal.geo_range,
        lifeSpan: animal.lifespan,
        price: animal.price,
        picture: animal.image_link,
      })
    );
  }

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      password: '123',
      cart: [1, 2],
      isAdmin: false,
    }),
    User.create({ username: 'murphy', password: '123', isAdmin: false }),
    User.create({ username: 'colin', password: '123', isAdmin: true }),
    User.create({ username: 'christian', password: '123', isAdmin: true }),
    User.create({ username: 'lauren', password: '123', isAdmin: true }),
    User.create({ username: 'sheba', password: '123', isAdmin: true }),
  ]);

  let carts = [];
  for (let i = 0; i < users.length; i++) {
    carts[i] = await CartModel.create();
    await users[i].setCartModel(carts[i]);
  }

  const orders = await Promise.all([Order.create(), Order.create()]);
  await users[5].addOrder(orders[0]);
  await users[4].addOrder(orders[1]);

  await orders[0].addAnimal(animals[0], { through: { quantity: 3 } });
  await orders[0].addAnimal(animals[1], { through: { quantity: 5 } });
  await orders[0].addAnimal(animals[2], { through: { quantity: 1 } });

  await orders[1].addAnimal(animals[5], { through: { quantity: 2 } });
  await orders[1].addAnimal(animals[6], { through: { quantity: 4 } });

  await carts[0].addAnimal(animals[10], { through: { quantity: 3 } });
  await carts[1].addAnimal(animals[11], { through: { quantity: 5 } });
  await carts[2].addAnimal(animals[21], { through: { quantity: 1 } });
  await carts[3].addAnimal(animals[53], { through: { quantity: 2 } });
  await carts[4].addAnimal(animals[67], { through: { quantity: 4 } });
  await carts[5].addAnimal(animals[67], { through: { quantity: 2 } });

  // const orderTest = await Order.findByPk(1, {
  //   include: Animal,
  //   through: { OrderAnimal },
  // });
  // const testOrderAnimals = await orderTest.getAnimals();

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
