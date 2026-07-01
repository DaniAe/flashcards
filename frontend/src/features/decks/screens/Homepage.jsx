import { useState } from 'react';
import DeckForm from '../components/DeckForm';
import useDecks from '../../../hooks/useDecks';
import FilterIcon from '../../../assets/icons/FilterIcon';
import SortIcon from '../../../assets/icons/SortIcon';
import PlusIcon from '../../../assets/icons/PlusIcon';
import CardView from '../components/CardView';

export default function Homepage() {
  const [toggleForm, setToggleForm] = useState(false);
  // const [showDelButton, setShowDelButton] = useState(false);
  let showDelButton = false;

  const { readDecks } = useDecks();

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
    <main className='mx-8 lg:mx-16 pt-6 position-relative'>
      {/* <!-- Filters & Add deck buttons --> */}
      <div className='flex justify-between items-center mb-10'>
        <div className='flex gap-3 text-muted'>
          <button className='flex flex-row cursor-pointer'>
            <SortIcon />
          </button>
          <button className='flex flex-row cursor-pointer'>
            <FilterIcon />
          </button>
        </div>
        <button
          className='bg-[#141414] text-white p-2 rounded-full flex flex-row shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[rgba(20,20,20,0.85)] transition-colors duration-250 ease-in-out'
          onClick={() => {
            setToggleForm(true);
          }}
        >
          <PlusIcon />
        </button>
      </div>

      {/* <!-- Add new deck form --> */}
      {toggleForm && (
        <DeckForm
          handleSubmit={handleSubmit}
          setToggleForm={setToggleForm}
          addButtonName={'Create New Deck'}
          useDecks={useDecks}
          showDelButton={showDelButton}
        />
      )}

      {/* <!-- Deck Examples --> */}
      <CardView useDecks={useDecks} />
    </main>
  );
}
