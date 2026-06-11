import EditIcon from '../../../assets/icons/EditIcon';
import ForwardArrowIcon from '../../../assets/icons/ForwardArrowIcon';
import TrashIcon from '../../../assets/icons/TrashIcon';
import { useState } from 'react';
import DeckForm from './DeckForm';
import ConfirmDeckDelete from './ConfirmDeckDelete';

export default function CardView({ useDecks }) {
  const [toggleForm, setToggleForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingDeck, setEditingDeck] = useState(null);
  let showDelButton = true;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
      {showDeleteConfirm ? (
        <ConfirmDeckDelete
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          setToggleForm={setToggleForm}
          editingDeck={editingDeck}
          setShowDeleteConfirm={setShowDeleteConfirm}
        />
      ) : (
        <>
          {toggleForm && (
            <DeckForm
              handleSubmit={handleSubmit}
              setToggleForm={setToggleForm}
              addButtonName={'Update Deck'}
              deckName={deckName}
              handleNameChange={handleNameChange}
              deckImgUrl={deckImgUrl}
              handleImgUrlChange={handleImgUrlChange}
              handleDelete={handleDelete}
              editingDeck={editingDeck}
              showDelButton={showDelButton}
              setShowDeleteConfirm={setShowDeleteConfirm}
            />
          )}
        </>
      )}

      <div className=''>
        <div className='grid md:grid-cols-4 gap-10 pb-20'>
          {decks.map((deck) => (
            <div
              key={deck._id}
              className='rounded-3xl shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.2)]'
            >
              <div className='rounded-2 p-4 flex flex-col justify-center items-center'>
                <a
                  onClick={() => {
                    setEditingDeck(deck);
                    editDeck(deck);
                  }}
                  className='w-full flex justify-end'
                >
                  <EditIcon />
                </a>
                <div className='pt-6 pb-10 w-full'>
                  <p className='pb-2'>{deck.name}</p>
                  <p className='text-[#717171] tracking-[1em] pl-[1em] text-[14px] text-center'>
                    PLAY
                  </p>
                </div>

                <div className='border-t w-full flex justify-between items-center pt-5 pb-1 font-normal text-[16px]'>
                  <p>{deck.cards} Cards</p>
                  <ForwardArrowIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
