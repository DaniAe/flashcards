const fs = require('fs/promises');

exports.readAll = async function () {
  const data = await fs.readFile('./public/data.json', 'utf8');
  return JSON.parse(data);
};

exports.read = async function (dname) {
  let deckName = null;
  const data = await fs.readFile('./public/data.json', 'utf8');
  const items = JSON.parse(data);
  for (let i = 0; i < items.length; i++) {
    if (items[i].name === dname) {
      deckName = items[i].name;
      break;
    }
  }

  return deckName;
};

exports.create = async function (deck) {
  const data = await fs.readFile('./public/data.json', 'utf8');
  const items = JSON.parse(data);
  items.push(deck);
  await fs.writeFile('./public/data.json', JSON.stringify(items));
  return deck;
};

exports.update = async function (deck, ogName) {
  const data = await fs.readFile('./public/data.json', 'utf8');
  const items = JSON.parse(data);
  let index = -1;
  for (let i = 0; i < items.length; i++) {
    if (items[i].name === ogName) {
      index = i;
    }
  }

  if (index >= 0) {
    items[index].name = deck.name;
    items[index].description = deck.description;
    items[index].imgUrl = deck.imgUrl;
    await fs.writeFile('./public/data.json', JSON.stringify(items));
  }
  return items[index];
};

exports.del = async function (dname) {
  const data = await fs.readFile('./public/data.json', 'utf8');
  const items = JSON.parse(data);
  let index = -1;
  for (let i = 0; i < items.length; i++) {
    if (items[i].name === dname) {
      index = i;
    }
  }
  if (index >= 0 && index < items.length) {
    items.splice(index, 1);
    await fs.writeFile('./public/data.json', JSON.stringify(items));
  }
};
