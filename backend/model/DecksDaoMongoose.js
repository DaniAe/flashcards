const mongoose = require('mongoose');

const deckSchema = mongoose.Schema({
  name: String,
  description: String,
  imgUrl: String,
  cards: Number,
});

const deckModel = mongoose.model('deck', deckSchema);

exports.readAll = async function () {
  const lstDecks = await deckModel.find();
  return lstDecks;
};

exports.read = async function (dname) {
  const deck = await deckModel.findOne({ name: dname });
  return deck;
};

exports.create = async function (deck) {
  const mongodeck = new deckModel(deck);
  await mongodeck.save();
  return mongodeck;
};

exports.update = async function (deck) {
  const result = await deckModel.findByIdAndUpdate(deck._id, deck, {
    new: true,
  });
  return result;
};

exports.del = async function (id) {
  const result = await deckModel.findByIdAndDelete(id);
  return result;
};

exports.deleteAll = async function (check) {
  if (check === 'test') {
    await deckModel.deleteMany();
  }
};
