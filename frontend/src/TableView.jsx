import { useState, useEffect } from 'react';

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

    console.log(res.status);
    console.log(res.headers.get('content-type'));

    const data = await res.json();
    console.log('Deleted:', data);

    readDecks();
  }

  return (
    <>
      {/* // Form */}
      {toggleForm && (
        <div
          className='container my-5 position-absolute start-50 translate-middle-x'
          id='form_container'
        >
          <div className='row justify-content-center'>
            <div className='col-12 col-md-6'>
              <form
                onSubmit={handleSubmit}
                className='py-3 bg-white border border-dark rounded-2 pb-4'
              >
                <div className='row justify-content-center'>
                  <div className='col-10 d-flex justify-content-end p-0'>
                    <button
                      type='button'
                      className='btn btn-block rounded-5'
                      style={{ color: '#b01515' }}
                      onClick={() => setToggleForm(false)}
                    >
                      <i className='bi bi-x-lg'></i>
                    </button>
                  </div>
                  <div className='col-10'>
                    <label className='col-form-label' htmlFor='deck_name'>
                      Deck Name:
                    </label>
                    <input
                      className='form-control'
                      type='text'
                      name='deck_name'
                      id='deck_name'
                      value={deckName}
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                  <div className='col-10'>
                    <label className='col-form-label' htmlFor='deck_desc'>
                      Deck Description:
                    </label>
                    <input
                      className='form-control'
                      type='text'
                      name='deck_desc'
                      id='deck_desc'
                      value={deckDesc}
                      onChange={handleDescChange}
                    />
                  </div>
                  <div className='col-10'>
                    <label className='col-form-label' htmlFor='img_url'>
                      Image URL:
                    </label>
                    <input
                      className='form-control'
                      type='text'
                      name='img_url'
                      id='img_url'
                      value={deckImgUrl}
                      onChange={handleImgUrlChange}
                    />
                  </div>
                  <div className='col-10 mt-4 d-flex justify-content-end'>
                    <button
                      type='submit'
                      className='create-new-deck btn btn-block text-white bg-black rounded-5'
                    >
                      Update Deck
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
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
