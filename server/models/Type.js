const mongoose = require('mongoose');

const { Schema } = mongoose;

// Change category to type
const typeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

// Change category to type
const Type = mongoose.model('Type', typeSchema);

// Change category to type
module.exports = Type;
