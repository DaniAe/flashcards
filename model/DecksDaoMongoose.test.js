const dao = require('./DecksDaoMongoose');
const dbcon = require('./DbConnection');

beforeAll(async function () {
  await dbcon.connect('test');
  await dao.deleteAll('test');
});

afterAll(async function () {
  await dbcon.disconnect();
});

afterEach(async function () {
  await dao.deleteAll('test');
});

test('Create new deck Mongoose', async function () {
  let newDeck = {
    name: 'Math',
    description: 'Studying math',
    imgUrl: 'img7.png',
  };

  let created = await dao.create(newDeck);
  let found = await dao.read(created.name);

  expect(created.name).toBeDefined();
  expect(found).not.toBeNull();
  expect(created.name).toEqual(found.name);
});

test('Delete a deck', async function () {
  let newDeck = {
    name: 'Math',
    description: 'Studying math',
    imgUrl: 'img7.png',
  };

  let created = await dao.create(newDeck);
  let foundBeforeDel = await dao.read(created.name);
  let deleted = await dao.del(created.name);
  let foundAfterDel = await dao.read(created.name);

  expect(foundBeforeDel).not.toBeNull();
  expect(foundAfterDel).toBeNull();
  // expect(deleted.name).toEqual(created.name);
});

test('Read all decks - empty database', async function () {
  let lstDecks = await dao.readAll();

  expect(lstDecks.length).toBe(0);
});

test('Read all decks', async function () {
  let newDeck = {
    name: 'Math',
    description: 'Studying math',
    imgUrl: 'img7.png',
  };
  let newDeck1 = {
    name: 'Eng',
    description: 'Studying eng',
    imgUrl: 'img8.png',
  };
  let newDeck2 = {
    name: 'Sci',
    description: 'Studying sci',
    imgUrl: 'img9.png',
  };

  await dao.create(newDeck);
  await dao.create(newDeck1);
  await dao.create(newDeck2);

  let lstDecks = await dao.readAll();

  expect(lstDecks.length).toBe(3);
  expect(lstDecks[0].name).toEqual(newDeck.name);
});

test('Update a deck', async function () {
  let newDeck = {
    name: 'Math',
    description: 'Studying math',
    imgUrl: 'img7.png',
  };

  await dao.create(newDeck);

  let updatedDeck = {
    name: 'Math1',
    description: 'Studying math2',
    imgUrl: 'img3.png',
  };

  let ogName = newDeck.name;

  let updated = await dao.update(updatedDeck, ogName);

  expect(updated).toBeDefined();
  // expect(updated.name).toBe('Math1');
  // expect(updated.description).toBe('Studying math2');
  // expect(updated.imgUrl).toBe('img3.png');
});
