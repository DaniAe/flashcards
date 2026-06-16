const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  deckId: String,
  front: String,
  back: String,
});

const cardModel = mongoose.model('card', cardSchema);
module.exports = cardModel;