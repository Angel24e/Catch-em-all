const { AuthenticationError } = require('apollo-server-express');
// Change product to pokemon, category to type, and order to adoption
const { User, Pokemon, Type, Adoption } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    // Change categories to types
    types: async () => {
      return await Type.find();
    },
    // Change products to pokemon and category to type
    pokemons: async (parent, { type, name }) => {
      const params = {};
        // Change category to type
      if (type) {
        params.type = type;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }
    // Change products to pokemon and category to type
      return await Pokemon.find(params).populate('type');
    },
        // Change products to pokemon and category to type
    pokemon: async (parent, { _id }) => {
      return await Pokemon.findById(_id).populate('type');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
        // Change product to pokemon, category to type, and order to adoption
          path: 'adoptions.pokemons',
          populate: 'type'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    adoption: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
        // Change product to pokemon, category to type, and order to adoption
          path: 'adoptions.pokemons',
          populate: 'type'
        });
        // Change orders to adoption
        return user.adoptions.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      // Change product to pokemon, category to type, and order to adoption
      const adoption = new Adoption({ pokemons: args.pokemons });
      const line_items = [];
        // Change products to pokemon
      const { pokemons } = await adoption.populate('pokemons');

      for (let i = 0; i < pokemons.length; i++) {
        // Change products to pokemon
        const pokemon = await stripe.pokemons.create({
          name: pokemons[i].name,
          description: pokemons[i].description,
          images: [`${url}/images/${pokemons[i].image}`]
        });

        const price = await stripe.prices.create({
        // Change products to pokemon
          pokemon: pokemon.id,
          unit_amount: pokemons[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Change order to adoption and products to pokemon
    addAdoption: async (parent, { pokemons }, context) => {
      console.log(context);
      if (context.user) {
        // Change order to adoption and products to pokemon
        const adoption = new Adoption({ pokemons });
        // change order to adoption
        await User.findByIdAndUpdate(context.user._id, { $push: { adoptions: adoption } });
        // change order to adoption
        return adoption;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    // change product to pokemon
    updatePokemon: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
        // change product to pokemon
      return await Pokemon.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
