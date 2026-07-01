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
import ConfirmDeckDelete from '../../decks/components/ConfirmDeckDelete';

export default function Cards() {
  const [toggleForm, setToggleForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [inEditMode, setInEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [frontCard, setFrontCard] = useState('');
  const [backCard, setBackCard] = useState('');

  const { decks, decksLoading } = useDecks();
  const { cards, readCards, cardsLoading } = useCards();

  // check if the url & deckId are the same
  const { deckId } = useParams();
  const deck = decks.find((deck) => deck._id === deckId);
  if (decksLoading) {
    return <></>;
  }
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

  // Create Card
  async function handleSubmit(event) {
    // event.preventDefault();
    const formData = new FormData(event.target);

    const newCard = {
      deckId: deck._id,
      front: formData.get('card_front'),
      back: formData.get('card_back'),
    };

    const res = await fetch('http://localhost:4000/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    });

    const data = await res.json();

    await readCards();
  }

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
    <div className='mx-8 lg:mx-16'>
      {/* <!-- Filters & Add deck buttons --> */}
      <div className='grid grid-cols-3 items-center py-6'>
        <div className='flex gap-x-8 gap-y-2 flex-wrap text-muted'>
          <Link to={'/'} className='flex items-center justify-center gap-2 min-w-0'>
            <BackArrowIcon size={'size-6'} color={'currentColor'} />
            <span className='truncate'>{deck.name}</span>
          </Link>
          <div className='flex gap-3'>
            <button className='cursor-pointer'>
              <SortIcon />
            </button>
            <button className='cursor-pointer'>
              <FilterIcon />
            </button>
          </div>
        </div>
        <div className='text-[#717171] truncate'>Total Cards: {deck.cards}</div>
        <button
          className='bg-[#141414] text-white p-2 rounded-full place-self-end shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[rgba(20,20,20,0.8)] self-center'
          onClick={() => {
            setInEditMode(false);
            setToggleForm(true);
          }}
        >
          <PlusIcon />
        </button>
      </div>

      {/* Add Card Form */}
      {showDeleteConfirm ? (
        <ConfirmDeckDelete
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          setToggleForm={setToggleForm}
          editingDeck={editingCard}
          setShowDeleteConfirm={setShowDeleteConfirm}
          warningText={`You are about to delete a card from the deck `}
          deckName={deck.name}
        />
      ) : (
        <>
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
              handleSubmit={handleSubmit}
              setShowDeleteConfirm={setShowDeleteConfirm}
            />
          )}
        </>
      )}

      {/* Cards */}
      {deckCards.length > 0 ? (
        <div className='flex flex-col gap-6 pt-5'>
          {deckCards.map((card) => (
            <div
              key={card._id}
              className='flex gap-4 items-center justify-center'
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 items-center w-full py-3 rounded-2xl shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.2)]'>
                <div className='min-w-0 md:place-self-start sm:px-10 py-2 mx-6 sm:mx-0 truncate'>{card.front}</div>
                <div className='min-w-0 md:place-self-start sm:border-l border-t sm:border-t-0 mx-6 sm:mx-0 sm:px-10 py-2 truncate'>
                  {card.back}
                </div>
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
      ) : (
        <>
          {cardsLoading ? (
            <></>
          ) : (
            <>
              <div>No cards yet...</div>
              <div>Click to '+' button to create a new card in this deck</div>
            </>
          )}
        </>
      )}
    </div>
  );
}
