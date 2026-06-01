import { useState, useEffect } from 'react';
import DeckForm from './shared/components/DeckForm';

export default function TableView({ decks, setDecks }) {
  const [toggleForm, setToggleForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [deckName, setDeckName] = useState('');
  const [deckDesc, setDeckDesc] = useState('');
  const [deckImgUrl, setDeckImgUrl] = useState('');

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

  async function readDecks() {
    let res = await fetch('http://localhost:4000/items');
    let lstDecks = await res.json();

    console.log(lstDecks);

    setDecks(lstDecks);
  }
  useEffect(() => {
    readDecks();
  }, []);

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
    console.log('Updated:', data);

    await readDecks();
  }

  // DELETE ITEM

  async function handleDelete(deck) {
    const res = await fetch(`http://localhost:4000/deleteitem/${deck._id}`, {
      method: 'GET',
    });

    const data = await res.json();
    console.log('Deleted:', data);

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

      {/* // Table of Decks */}
      <div className='container d-flex flex-column'>
        <div className='row'>
          <div className='col'>
            <div className='table-responsive'>
              <table className='table table-striped rounded-top overflow-hidden mt-4'>
                <thead className='table-dark'>
                  <tr>
                    <td></td>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Image URL</th>
                    <th>Cards</th>
                  </tr>
                </thead>
                <tbody id='items'>
                  {decks.map((deck) => (
                    <tr key={deck._id}>
                      <td>
                        <a onClick={() => editDeck(deck)}>
                          <i className='bi bi-pencil-square text-primary'></i>
                        </a>
                        &nbsp;
                        <a onClick={() => handleDelete(deck)}>
                          <i className='bi bi-trash-fill text-danger'></i>
                        </a>
                      </td>
                      <td>{deck.name}</td>
                      <td>{deck.description}</td>
                      <td>{deck.imgUrl}</td>
                      <td>{deck.cards}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
