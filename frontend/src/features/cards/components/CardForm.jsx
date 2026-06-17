import CloseButtonIcon from '../../../assets/icons/CloseButtonIcon';
import useCards from '../../../hooks/useCards';
import useDecks from '../../../hooks/useDecks';

export default function CardForm({
  setToggleForm,
  handleFrontChange,
  setFrontCard,
  frontCard,
  handleBackChange,
  setBackCard,
  backCard,
  deck,
  handleUpdate,
  inEditMode,
  handleDelete,
  editingCard,
}) {
  const { readCards } = useCards();

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

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <form
        onSubmit={inEditMode ? handleUpdate : handleSubmit}
        className='bg-white border border-dark rounded-2 pt-4 pb-6 px-6 rounded-2xl shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.2)]'
      >
        <div className='flex justify-center items-center'>
          <div className='flex flex-col justify-center gap-3'>
            <div className='flex self-end p-0'>
              <button
                className='text-[#b01515]'
                type='button'
                onClick={() => {
                  setToggleForm(false);
                  setFrontCard('');
                  setBackCard('');
                }}
              >
                <CloseButtonIcon />
              </button>
            </div>

            <div className='flex items-center justify-center'>
              <label htmlFor='card_front'>Front:</label>
              <textarea
                className='border border-black rounded-2xl p-2'
                type='text'
                name='card_front'
                id='card_front'
                value={frontCard}
                onChange={handleFrontChange}
                required
              />
            </div>

            <div className='flex items-center justify-center'>
              <label htmlFor='card_back'>Back:</label>
              <textarea
                className='border border-black rounded-2xl p-2'
                type='text'
                name='card_back'
                id='card_back'
                value={backCard}
                onChange={handleBackChange}
                required
              />
            </div>

            <div
              className={`flex ${
                inEditMode ? 'justify-between' : 'justify-end'
              } items-center`}
            >
              {inEditMode && (
                <div className='text-white bg-[#b01515] rounded-full px-2 py-1'>
                  <button
                    type='submit'
                    onClick={() => handleDelete(editingCard)}
                  >
                    Delete
                  </button>
                </div>
              )}
              <div className='text-white bg-black rounded-full px-2 py-1'>
                <button
                  type='submit'
                  onSubmit={() => {
                    setFrontCard('');
                    setBackCard('');
                  }}
                >
                  {inEditMode ? 'Update Card' : 'Add Card'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
