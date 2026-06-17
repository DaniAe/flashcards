import SortIcon from '../../../assets/icons/SortIcon';
import FilterIcon from '../../../assets/icons/FilterIcon';
import PlusIcon from '../../../assets/icons/PlusIcon';
import BackArrowIcon from '../../../assets/icons/BackArrowIcon';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useDecks from '../../../hooks/useDecks';
import CardForm from '../components/CardForm';
import useCards from '../../../hooks/useCards';
import EditIcon from '../../../assets/icons/EditIcon';

export default function Cards() {
  const [toggleForm, setToggleForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [inEditMode, setInEditMode] = useState(false);

  const [frontCard, setFrontCard] = useState('');
  const [backCard, setBackCard] = useState('');

  const { decks } = useDecks();
  const { cards, readCards } = useCards();

  // check if the url & deckId are the same
  const { deckId } = useParams();
  const deck = decks.find((deck) => deck._id === deckId);
  if (!deck) {
    return <p>Deck Not Found</p>;
  }

  // check if the cards correspond to the deck in the url
  const deckCards = cards.filter((card) => card.deckId === deck._id);

  // Edit Card
  function editCard(card) {
    setToggleForm(true);
    setEditingId(card._id);
    setEditingCard(card);

    setFrontCard(card.front);
    setBackCard(card.back);
  }

  const handleFrontChange = (event) => {
    setFrontCard(event.target.value);
  };

  const handleBackChange = (event) => {
    setBackCard(event.target.value);
  };

  // Update Card
  async function handleUpdate(event) {
    // event.preventDefault();

    const updatedCard = {
      _id: editingId,
      deckId: deck._id,
      front: frontCard,
      back: backCard,
    };

    const res = await fetch('http://localhost:4000/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCard),
    });

    const data = await res.json();
    console.log('Updated: ' + data);

    await readCards();
  }

  async function handleDelete(card) {
    const res = await fetch(`http://localhost:4000/deletecard/${card._id}`, {
      method: 'GET',
    });
    const data = await res.json();

    readCards();
  }

  return (
    <>
      {/* <!-- Filters & Add deck buttons --> */}
      <div className='grid grid-cols-3 items-center mx-16 py-6'>
        <div className='flex gap-8 text-muted'>
          <Link to={'/'} className='flex items-center gap-2'>
            <BackArrowIcon /> <span>{deck.name}</span>
          </Link>
          <div className='flex gap-3'>
            <button>
              <SortIcon />
            </button>
            <button>
              <FilterIcon />
            </button>
          </div>
        </div>
        <div className='text-[#717171]'>Total Cards: {deck.cards}</div>
        <button
          className='bg-[#141414] text-white p-2 rounded-full place-self-end shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[rgba(20,20,20,0.8)]'
          onClick={() => {
            setInEditMode(false);
            setToggleForm(true);
          }}
        >
          <PlusIcon />
        </button>
      </div>

      {/* Add Card Form */}
      {toggleForm && (
        <CardForm
          setToggleForm={setToggleForm}
          deck={deck}
          handleFrontChange={handleFrontChange}
          setFrontCard={setFrontCard}
          frontCard={frontCard}
          handleBackChange={handleBackChange}
          setBackCard={setBackCard}
          backCard={backCard}
          handleUpdate={handleUpdate}
          inEditMode={inEditMode}
          handleDelete={handleDelete}
          editingCard={editingCard}
        />
      )}

      {/* Cards */}
      <div className='flex flex-col gap-6'>
        {deckCards.map((card) => (
          <div
            key={card._id}
            className='flex mx-16 gap-4 items-center justify-center'
          >
            <div className='grid grid-cols-2 items-center w-full p-2 rounded-full shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.2)]'>
              <div>{card.front}</div>
              <div>{card.back}</div>
            </div>
            <a
              onClick={() => {
                setInEditMode(true);
                editCard(card);
              }}
            >
              <EditIcon />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
