const db = require('./connection');
// Change product to pokemon and category to type
const { User, Pokemon, Category } = require('../models');

db.once('open', async () => {
  // change category to type
  await Type.deleteMany();

    // change category to type
  const types = await Type.insertMany([
    { name: 'Fire' },
    { name: 'Fairy' },
    { name: 'Water' },
    { name: 'Normal' },
    { name: 'Flying' },
    { name: 'Dragon' },
    { name: 'Electric' },
    { name: 'Ghost' },
    { name: 'Psychic' }
  ]);

  console.log('types seeded');

  // Change product to pokemon
  await Pokemon.deleteMany();

    // Change product to pokemon
    // replace all the seeded content to pokemon
  const pokemons = await Pokemon.insertMany([
    {
      name: 'Magikarp',
      description:
        '',
      image: 'magikarp.jpg',
      type: types[0]._id,
      price: 1000000,
      quantity: 3
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
    {
      name: '',
      description:
        '',
      image: '.jpg',
      type: types[0]._id,
      price: ,
      quantity: 
    },
  ]);

  console.log('pokemon seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    // change order to adoption
    adoptions: [
      {
        // change products to pokemon
        pokemons: [pokemons[0]._id, pokemons[0]._id, pokemons[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
