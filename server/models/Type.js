const mongoose = require('mongoose');

const { Schema } = mongoose;

// Change category to type
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

// Change category to type
const Category = mongoose.model('Category', categorySchema);

// Change category to type
module.exports = Category;
