const cardModel = require('../model/cardModel');
const deckModel = require('../model/deckModel');

exports.readAll = async function () {
  return await cardModel.find();
};

exports.read = async function (cname) {
  return await cardModel.findOne({ name: cname });
};

exports.create = async function (card) {
  const mongocard = new cardModel(card);
  await mongocard.save();

  await deckModel.findByIdAndUpdate(card.deckId, {
    $inc: { cards: 1 },
  });

  return mongocard;
};

exports.update = async function (card) {
  return await cardModel.findByIdAndUpdate(card._id, card);
};

exports.del = async function (id) {
  const card = await cardModel.findById(id);
  await cardModel.findByIdAndDelete(id);

  await deckModel.findByIdAndUpdate(card.deckId, {
    $inc: { cards: -1 },
  });

  return card;
};
