import { useState } from 'react';
import DeckForm from '../../../shared/components/DeckForm';
import useDecks from '../../../hooks/useDecks';
import DecksView from './DecksView';

export default function Homepage() {
  const [toggleForm, setToggleForm] = useState(false);
  const [changeView, setChangeView] = useState(false);
  const { readDecks } = useDecks();

  let viewIconStyle = 'bi ';
  if (!changeView) viewIconStyle += 'bi-view-stacked';
  else if (changeView) viewIconStyle += 'bi-view-list';

  async function handleSubmit(event) {
    // event.preventDefault();

    const formData = new FormData(event.target);

    const newDeck = {
      name: formData.get('deck_name'),
      description: formData.get('deck_desc'),
      imgUrl: formData.get('img_url'),
    };

    const res = await fetch('http://localhost:4000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDeck),
    });

    const data = await res.json();
    console.log('Created:', data);

    readDecks();
  }
  return (
    <main className='mx-3 pt-3 position-relative pb-5'>
      {/* <!-- Add new deck form --> */}
      {toggleForm && (
        <DeckForm
          handleSubmit={handleSubmit}
          setToggleForm={setToggleForm}
          addButtonName={'Create New Deck'}
        />
      )}

      {/* <!-- Filters & Add deck buttons --> */}
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div className='d-flex gap-3 text-muted'>
          <button
            className='btn p-0'
            onClick={() => setChangeView(!changeView)}
          >
            <i className={viewIconStyle}></i>
            View
          </button>

          <button className='btn p-0'>
            <i className='bi bi-filter'></i> Sort
          </button>
          <button className='btn p-0'>
            <i className='bi bi-funnel'></i> Filter
          </button>
        </div>
        <button
          className='add-deck-button btn rounded-5'
          onClick={() => setToggleForm(true)}
        >
          <i className='bi bi-plus-lg'></i> Add Deck
        </button>
      </div>

      {/* <!-- Deck Examples --> */}
      <DecksView useDecks={useDecks} changeView={changeView} />
    </main>
  );
}
