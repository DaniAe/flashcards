const dao = require('./DecksDaoMem');

test('ReadAll mem has all the predefined decks', async function () {
  let lstDecks = await dao.readAll();
  expect(lstDecks.length).toBeGreaterThan(1);
});

test('Create method', async function () {
  let newDeck = {
    name: 'Math',
    description: 'Studying math',
    imgUrl: 'img7.png',
  };

  let created = await dao.create(newDeck);

  expect(created.name).toBeDefined();

  await dao.del(created.name);
});

test('Update method', async function () {
  let deck = {
    name: 'Math',
    description: 'Studying math',
    imgUrl: 'img7.png',
  };
  await dao.create(deck);

  let updatedDeck = {
    name: 'Math1',
    description: 'Studying math2',
    imgUrl: 'img3.png',
  };
  let ogName = deck.name;

  let updated = await dao.update(updatedDeck, ogName);

  expect(updated).toBeDefined();
  expect(updated.name).toBe('Math1');
  expect(updated.description).toBe('Studying math2');
  expect(updated.imgUrl).toBe('img3.png');

  await dao.del(updatedDeck.name);
  await dao.del(deck.name);
});

test('Delete method', async function () {
  let deck = {
    name: 'Math',
    description: 'Studying math',
    imgUrl: 'img7.png',
  };

  const ogLength = await dao.readAll();
  await dao.create(deck);
  const newLength = await dao.readAll();
  await dao.del(deck.name);

  expect(newLength.length).toBe(ogLength.length + 1);

  await dao.del(deck.name);
});

test('Read one deck', async function () {
  let deck = {
    name: 'Math',
    description: 'Studying math',
    imgUrl: 'img7.png',
  };

  await dao.create(deck);
  const oneDeck = await dao.read('Math');

  expect(oneDeck).toBe('Math');
  await dao.del(deck.name);
});
