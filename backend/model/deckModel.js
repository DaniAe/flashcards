const mongoose = require('mongoose');

const deckSchema = mongoose.Schema({
  name: String,
  description: String,
  imgUrl: String,
  cards: Number,
});

const deckModel = mongoose.model('deck', deckSchema);
module.exports = deckModel;
