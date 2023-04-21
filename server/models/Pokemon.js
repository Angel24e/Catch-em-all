const mongoose = require('mongoose');

const { Schema } = mongoose;

// change product to pokemon
const productSchema = new Schema({
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
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

// change product to pokemon
const Product = mongoose.model('Product', productSchema);

// change product to pokemon
module.exports = Product;
