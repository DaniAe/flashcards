import CloseButtonIcon from '../../../assets/icons/CloseButtonIcon';

export default function ConfirmDeckDelete({
  handleSubmit,
  handleDelete,
  setToggleForm,
  editingDeck,
  setShowDeleteConfirm,
  warningText,
  deckName,
}) {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-white border border-dark rounded-2 py-6 px-6 rounded-2xl shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.2)]'
      >
        <div className='flex justify-center items-center lg:w-xs'>
          <div className='flex flex-col justify-center gap-3'>
            <div className='text-start'>
              <p>
                {warningText} <b>{editingDeck?.name || deckName}. </b>
                <i>This action cannot be undone.</i>
              </p>
              <p>Would you like to proceed?</p>
            </div>

            <div className='flex justify-between items-center'>
              <div>
                <button
                  className='cursor-pointer underline text-[#1D68AA] rounded-full px-2 py-1'
                  type='button'
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setToggleForm(false);
                  }}
                >
                  Cancel
                </button>
              </div>

              <div>
                <button
                  type='submit'
                  onClick={() => {
                    handleDelete(editingDeck);
                    setShowDeleteConfirm(false);
                    setToggleForm(false);
                  }}
                  className='text-white bg-[#b01515] hover:bg-[rgba(176,21,21,0.8)] transition-colors duration-250 ease-in-out cursor-pointer rounded-full px-2 py-1'
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
