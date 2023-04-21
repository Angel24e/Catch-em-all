const mongoose = require('mongoose');

const { Schema } = mongoose;

// change order to adoption
const adoptionSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  // change product to pokemon
  pokemons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon'
    }
  ]
});

// change order to adoption
const Adoption = mongoose.model('Adoption', adoptionSchema);

// change order to adoption
module.exports = Adoption;
