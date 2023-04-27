const db = require('./connection');
// Change product to pokemon and category to type
const { User, Pokemon, Type } = require('../models');

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
    { name: 'Psychic' },
    { name: 'Poison' },
    { name: 'Rock' },
    { name: 'Bug' },
    { name: 'Ice' },
    { name: 'Grass' }
  ]);

  console.log('types seeded');

  // Change product to pokemon
  await Pokemon.deleteMany();

    // Change product to pokemon
    // replace all the seeded content to pokemon
  const pokemons = await Pokemon.insertMany([
    {
      name: 'Arceus',
      description:
        'Arceus, known as the "Original One," is a mythical Pokémon believed to have created the Pokémon universe. It has the ability to change its type depending on the Plate or Z-Crystal it holds.',
      image: 'arcus.jpg',
      category: categories[3]._id,
      price: 300,
      quantity: 5
    },
    {
      name: 'Pikachu',
      description:
        ' Pikachu is an iconic, mouse-like Pokémon known for its electric abilities and its role as the mascot of the Pokémon franchise. It stores electricity in its cheeks and can discharge powerful electric attacks.',
      image: 'pikachu.jpg',
      category: categories[6]._id,
      price: 200,
      quantity: 14
    },
    {
      name: 'Snorlax',
      category: categories[3]._id,
      description:
        ' Snorlax is a large, bear-like Pokémon known for its incredible appetite and tendency to sleep for long periods. It has immense strength and can be difficult to move when its asleep.',
      image: 'snorlax.jpg',
      price: 400,
      quantity: 37
    },
    {
      name: 'Eevee',
      category: categories[3]._id,
      description:
        ' Eevee is a small, fox-like Pokémon with an unstable genetic code, allowing it to evolve into multiple different forms, known as "Eeveelutions."',
      image: 'eevee.jpg',
      price: 700,
      quantity: 45
    },
    {
      name: 'Horsea',
      category: categories[2]._id,
      description:
        ' Horsea is a small, seahorse-like Pokémon that can shoot water from its snout with great accuracy to protect itself from predators.',
      image: 'horsea.jpg',
      price: 800,
      quantity: 40
    },
    {
      name: 'Mew',
      category: categories[8]._id,
      description:
        'Mew is a rare, mythical Pokémon with a playful and curious nature. It is said to have the genetic code of every Pokémon, allowing it to learn any move',
      image: 'mew.jpg',
      price: 900,
      quantity: 33
    },
    {
      name: 'Mimikkyu',
      category: categories[7]._id,
      description:
        ' Mimikyu is a small, ghostly Pokémon that wears a disguise resembling Pikachu to make friends, as it is envious of Pikachus popularity. Its true form is hidden beneath a ragged cloth.',
      image: 'mimikkyu.jpg',
      price: 1000,
      quantity: 22
    },
    {
      name: 'Oshawott',
      category: categories[2]._id,
      description:
        'Oshawott is a small, otter-like Pokémon that uses the scalchop on its belly as a weapon and a tool. Its one of the three starter Pokémon in the Unova region.',
      image: 'oshawott.jpg',
      price: 2000,
      quantity: 9
    },
    {
      name: 'Piplup',
      category: categories[2]._id,
      description: ' Piplup is a small, penguin-like Pokémon that takes pride in its appearance. Its one of the three starter Pokémon in the Sinnoh region.',
      image: 'piplup.jpg',
      price: 3000,
      quantity: 15
    },
    {
      name: 'Rayquaza',
      category: categories[5]._id,
      description:
        'Rayquaza is a legendary Dragon/Flying-type Pokémon that lives in the ozone layer. It has the ability to Mega Evolve and is known to maintain peace between Kyogre and Groudon.',
      image: 'rayquaza.jpg',
      price: 4000,
      quantity: 10
    },
    {
      name: 'Squirtle',
      category: categories[2]._id,
      description:
        'Squirtle is a small, turtle-like Pokémon that can withdraw into its shell for protection. Its one of the three starter Pokémon in the Kanto region.',
      image: 'squirtle.jpg',
      price: 5000,
      quantity: 30
    },
    {
      name: 'Togepi',
      category: categories[1]._id,
      description:
        'Togepi is a small, egg-like Pokémon known for its innocence and good luck. Its shell is covered in a pattern that is said to bring happiness to whoever sees it.',
      image: 'togepi.jpg',
      price: 6000,
      quantity: 25
    },
    {
      name: 'Vulpix',
      category: categories[0]._id,
      description:
        ' Vulpix is a small, fox-like Pokémon with six tails. It can control fire and, when it evolves into Ninetales, is said to possess mystical abilities. There is also an Alolan variant of Vulpix with an Ice type.',
      image: 'vulpix.jpg',
      price: 7000,
      quantity: 20
    },
    {
      name: 'Magikrap',
      category: categories[2]._id,
      description:
        '  Magikarp is a fish-like Pokémon known for its weakness and inability to do much more than splash around. However, it evolves into the powerful Gyarados, making it an interesting choice for trainers willing to invest time and effort into raising ',
      image: 'magikrap.jpg',
      price: 8000,
      quantity: 15
    },
    {
      name: 'Chikorita',
      description:
        ' Chikorita is a small, leafy Pokémon that resembles a young plant. Its one of the three starter Pokémon in the Johto region. The leaf on its head can detect the warmth and humidity of its surroundings.',
      image: 'chikorita.jpg',
      category: categories[13]._id,
      price: 9000,
      quantity: 11
    },
    {
      name: 'Leafeon',
      description:
        ' Leafeon is an Eeveelution, evolving from Eevee when it is exposed to a Leaf Stone. It resembles a graceful, quadrupedal creature with foliage-like features. Leafeon can use photosynthesis to purify the air around it.',
      image: 'leafeon.jpg',
      category: categories[13]._id,
      price: 1999,
      quantity: 15
    },
    {
      name: 'Glaceon',
      description:
        ' Glaceon is another Eeveelution, evolving from Eevee when it is exposed to an Ice Stone. It has a sleek, ice-like appearance and can manipulate its body temperature to freeze the moisture in the air, creating ice crystals.',
      image: 'glaceon.jpg',
      category: categories[12]._id,
      price: 4500,
      quantity: 13
    },
    {
      name: 'Cubone',
      description:
        ' Cubone is a small, lonely Pokémon that wears the skull of its deceased mother on its head. It uses a bone as a weapon and is known for its mournful cries.',
      image: 'cubone.jpg',
      category: categories[13]._id,
      price: 5999,
      quantity: 12
    },
    {
      name: 'Onix',
      description:
        ' Onix is a large, rock-like Pokémon composed of boulders joined together. It burrows through the ground at high speeds and can cause earthquakes. Onix evolves into Steelix when traded holding a Metal Coat.',
      image: 'onix.jpg',
      category: categories[10]._id,
      price: 2500,
      quantity: 2
    },
    {
      name: 'Caterpie',
      description:
        ' Caterpie is a small, caterpillar-like Pokémon known for its ability to release a strong-smelling odor to repel predators. It evolves quickly, turning into a Metapod before reaching its final form, Butterfree.',
      image: 'caterpie.jpg',
      category: categories[11]._id,
      price: 5500,
      quantity: 9
    },
    {
      name: 'Arbok',
      description:
        ' Arbok is a large, snake-like Pokémon that evolves from Ekans. It has a fearsome appearance, with a cobra-like hood and an intimidating pattern on its chest. Arbok can use its powerful coils to constrict and crush its opponents.',
      image: 'arbok.jpg',
      category: categories[9]._id,
      price: 6500,
      quantity: 7
    },
    {
      name: 'Rookidee',
      description:
        ' Rookidee is a small, bird-like Pokémon known for its tenacity and determination. It will bravely challenge opponents that are much larger than itself. Rookidee evolves into Corvisquire, which later evolves into the Flying/Steel-type Pokémon Corviknight.',
      image: 'rookidee.jpg',
      category: categories[4]._id,
      price: 7500,
      quantity: 5
    }
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
