import { useState } from 'react';
import DeckForm from '../../../shared/components/DeckForm';
import TableView from '../components/TableView';
import CardView from '../components/CardView';

export default function DecksView({ useDecks, changeView }) {
  const [toggleForm, setToggleForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [deckName, setDeckName] = useState('');
  const [deckDesc, setDeckDesc] = useState('');
  const [deckImgUrl, setDeckImgUrl] = useState('');

  const { decks, readDecks } = useDecks();

  function editDeck(deck) {
    setToggleForm(true);
    setEditingId(deck._id);

    setDeckName(deck.name);
    setDeckDesc(deck.description);
    setDeckImgUrl(deck.imgUrl);
  }

  const handleNameChange = (event) => {
    setDeckName(event.target.value);
  };

  const handleDescChange = (event) => {
    setDeckDesc(event.target.value);
  };

  const handleImgUrlChange = (event) => {
    setDeckImgUrl(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const updatedDeck = {
      _id: editingId,
      name: deckName,
      description: deckDesc,
      imgUrl: deckImgUrl,
    };

    const res = await fetch('http://localhost:4000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDeck),
    });

    const data = await res.json();

    await readDecks();
  }

  // DELETE ITEM

  async function handleDelete(deck) {
    const res = await fetch(`http://localhost:4000/deleteitem/${deck._id}`, {
      method: 'GET',
    });

    const data = await res.json();

    readDecks();
  }

  return (
    <>
      {/* // Form */}
      {toggleForm && (
        <DeckForm
          handleSubmit={handleSubmit}
          setToggleForm={setToggleForm}
          addButtonName={'Update Deck'}
          deckName={deckName}
          handleNameChange={handleNameChange}
          deckDesc={deckDesc}
          handleDescChange={handleDescChange}
          deckImgUrl={deckImgUrl}
          handleImgUrlChange={handleImgUrlChange}
        />
      )}

      {/* View */}
      {changeView ? (
        <CardView
          decks={decks}
          editDeck={editDeck}
          handleDelete={handleDelete}
        />
      ) : (
        <TableView
          decks={decks}
          editDeck={editDeck}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}
