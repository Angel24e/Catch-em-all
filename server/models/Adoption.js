const mongoose = require('mongoose');

const { Schema } = mongoose;

// change order to adoption
const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  // change product to pokemon
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

// change order to adoption
const Order = mongoose.model('Order', orderSchema);

// change order to adoption
module.exports = Order;
