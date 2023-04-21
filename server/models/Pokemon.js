const mongoose = require('mongoose');

const { Schema } = mongoose;

// change product to pokemon
const pokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  // change category to type
  type: {
    type: Schema.Types.ObjectId,
    ref: 'Type',
    required: true
  }
});

// change product to pokemon
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// change product to pokemon
module.exports = Pokemon;
