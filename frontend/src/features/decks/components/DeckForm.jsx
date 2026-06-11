import CloseButtonIcon from '../../../assets/icons/CloseButtonIcon';

export default function DeckForm({
  handleSubmit,
  setToggleForm,
  addButtonName,
  deckName,
  handleNameChange,
  deckImgUrl,
  handleImgUrlChange,
  editingDeck,
  handleDelete,
  showDelButton,
  setShowDeleteConfirm,
}) {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-white border border-dark rounded-2 pt-4 pb-6 px-6 rounded-2xl shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.2)]'
      >
        <div className='flex justify-center items-center'>
          <div className='flex flex-col justify-center gap-3'>
            <div className='flex self-end p-0'>
              <button
                className='text-[#b01515]'
                type='button'
                onClick={() => setToggleForm(false)}
              >
                <CloseButtonIcon />
              </button>
            </div>

            <div>
              <label htmlFor='deck_name'>Deck Name:</label>
              <input
                className='border border-black rounded-full'
                type='text'
                name='deck_name'
                id='deck_name'
                value={deckName}
                onChange={handleNameChange}
                required
              />
            </div>

            {showDelButton ? (
              <div className='flex justify-between items-center'>
                <div className='text-white bg-[#b01515] rounded-full px-2 py-1'>
                  <button
                    type='button'
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete
                  </button>
                </div>
                <div className='text-white bg-black rounded-full px-2 py-1'>
                  <button type='submit'>{addButtonName}</button>
                </div>
              </div>
            ) : (
              <div className='flex justify-end items-center'>
                <div className='text-white bg-black rounded-full px-2 py-1'>
                  <button type='submit'>{addButtonName}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
