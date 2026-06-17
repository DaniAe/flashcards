const deckModel = require('../model/deckModel');
const cardModel = require('../model/cardModel');

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
  await cardModel.deleteMany({ deckId: id });
  return await deckModel.findByIdAndDelete(id);
};

exports.deleteAll = async function (check) {
  if (check === 'test') {
    await deckModel.deleteMany();
  }
};
