const dao = require('../../backend/model/DecksDaoMongoose');

exports.getAll = async function (req, res) {
  try {
    res.json(await dao.readAll());
  } catch (err) {
    console.error('Error reading file:', err);
  }
};

exports.get = async function (req, res) {
  let dname = req.params.dname;
  let deck = await dao.read(dname);
  res.send(deck);
  res.end();
};

exports.postCreateUpdate = async function (req, res) {
  let name = req.body.name;
  let desc = req.body.description;
  let imgUrl = req.body.imgUrl;
  const id = req.body._id;

  if (id) {
    const updatedDeck = {
      _id: id,
      name: req.body.name,
      description: req.body.description,
      imgUrl: req.body.imgUrl,
    };
    res.json(await dao.update(updatedDeck));
  } else {
    const newDeck = {
      name: name,
      description: desc,
      imgUrl: imgUrl,
      cards: 0,
    };
    res.json(await dao.create(newDeck));
  }
};

exports.getDelete = async function (req, res) {
  let id = req.params._id;

  try {
    res.json(await dao.del(id));
  } catch (err) {
    console.error('Error reading file:', err);
  }
};
