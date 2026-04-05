const dao = require('../model/DecksDaoMem');
const fs = require('fs');

exports.getAll = function (req, res) {
  fs.readFile('./public/data.json', async function (err) {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      res.json(await dao.readAll());
    }
  });
};

exports.get = async function (req, res) {
  let dname = req.params.dname;
  let deck = await dao.read(dname);
  res.send(deck);
  res.end();
};

exports.postCreateUpdate = async function (req, res) {
  let name = req.body.deck_name;
  let desc = req.body.deck_desc;
  let imgUrl = req.body.img_url;
  const originalName = req.body.original_name;

  if (originalName !== '') {
    const updatedDeck = {
      name: req.body.deck_name,
      description: req.body.deck_desc,
      imgUrl: req.body.img_url,
    };
    await dao.update(updatedDeck, originalName);
    res.redirect('decks.html');
  } else {
    const newDeck = {
      name: name,
      description: desc,
      imgUrl: imgUrl,
      cards: 0,
    };
    await dao.create(newDeck);
    res.redirect('decks.html');
  }
};

exports.getDelete = function (req, res) {
  let dname = req.params.dname;

  fs.readFile('./public/data.json', async function (err, data) {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      await dao.del(dname);
      res.redirect('../decks.html');
    }
  });
};
