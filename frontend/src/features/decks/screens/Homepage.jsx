import { useState } from 'react';
import DeckForm from '../../../shared/components/DeckForm';
import useDecks from '../../../hooks/useDecks';
import DecksView from './DecksView';
import TableViewIcon from '../../../assets/icons/TableViewIcon';
import CardViewIcon from '../../../assets/icons/CardViewIcon';
import FilterIcon from '../../../assets/icons/FilterIcon';
import SortIcon from '../../../assets/icons/SortIcon';
import PlusIcon from '../../../assets/icons/PlusIcon';

export default function Homepage() {
  const [toggleForm, setToggleForm] = useState(false);
  const [changeView, setChangeView] = useState(false);
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
    <main className='mx-3 pt-3 position-relative pb-5'>
      {/* <!-- Filters & Add deck buttons --> */}
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-3 text-muted'>
          <button
            className='flex flex-row'
            onClick={() => setChangeView(!changeView)}
          >
            {changeView ? <TableViewIcon /> : <CardViewIcon />}
            <span>View</span>
          </button>

          <button className='flex flex-row'>
            <SortIcon /> <span>Sort</span>
          </button>
          <button className='flex flex-row'>
            <FilterIcon /> <span>Filter</span>
          </button>
        </div>
        <button
          className='bg-[#131313] text-white px-2 py-1 rounded-full flex flex-row'
          onClick={() => setToggleForm(true)}
        >
          <PlusIcon /> <span>Add Deck</span>
        </button>
      </div>

      {/* <!-- Add new deck form --> */}
      {toggleForm && (
        <DeckForm
          handleSubmit={handleSubmit}
          setToggleForm={setToggleForm}
          addButtonName={'Create New Deck'}
        />
      )}

      {/* <!-- Deck Examples --> */}
      <DecksView useDecks={useDecks} changeView={changeView} />
    </main>
  );
}
