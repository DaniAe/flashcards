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
  handleSubmit,
  setShowDeleteConfirm,
}) {
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
              <label htmlFor='card_front' className='mr-2'>
                Front:
              </label>
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
              <label htmlFor='card_back' className='mr-2'>
                Back:
              </label>
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
                <div className='text-white bg-[#b01515] hover:bg-[rgba(176,21,21,0.8)] transition-colors duration-250 ease-in-out rounded-full'>
                  <button
                    type='submit'
                    className='px-2 py-1 cursor-pointer'
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete
                  </button>
                </div>
              )}
              <div className='text-white bg-black hover:bg-[rgba(20,20,20,0.85)] transition-colors duration-250 ease-in-out rounded-full'>
                <button
                  type='submit'
                  className='px-2 py-1 cursor-pointer'
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
