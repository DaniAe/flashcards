const dao = require('../dao/CardsDaoMongoose');

exports.getAll = async function (req, res) {
  res.json(await dao.readAll());
};

exports.get = async function (req, res) {
  let cname = req.params.cname;
  res.json(await dao.read(cname));
};

exports.postCreateUpdate = async function (req, res) {
  let front = req.body.front;
  let back = req.body.back;
  const deckId = req.body.deckId;

  // if (deckId) {
  //   const updatedCard = {
  //     _id: deckId,
  //     front: req.body.front,
  //     back: req.body.back,
  //   };
  //   res.json(await dao.update(updatedCard));
  // } else {
  const newCard = {
    deckId,
    front,
    back,
  };
  res.json(await dao.create(newCard));
  // }
};

exports.getDelete = async function (req, res) {
  let id = req.params._id;
  res.json(await dao.del(id));
};
