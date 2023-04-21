const { AuthenticationError } = require('apollo-server-express');
// Change product to pokemon, category to type, and order to adoption
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    // Change categories to types
    categories: async () => {
      return await Category.find();
    },
    // Change products to pokemon and category to type
    products: async (parent, { category, name }) => {
      const params = {};
        // Change category to type
      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }
    // Change products to pokemon and category to type
      return await Product.find(params).populate('category');
    },
        // Change products to pokemon and category to type
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
        // Change product to pokemon, category to type, and order to adoption
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
        // Change product to pokemon, category to type, and order to adoption
          path: 'orders.products',
          populate: 'category'
        });
        // Change orders to adoption
        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      // Change product to pokemon, category to type, and order to adoption
      const order = new Order({ products: args.products });
      const line_items = [];
        // Change products to pokemon
      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        // Change products to pokemon
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
        // Change products to pokemon
          product: product.id,
          unit_amount: products[i].price * 100,
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
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        // Change order to adoption and products to pokemon
        const order = new Order({ products });
        // change order to adoption
        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
        // change order to adoption
        return order;
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
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
        // change product to pokemon
      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
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
