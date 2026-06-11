import CloseButtonIcon from '../../../assets/icons/CloseButtonIcon';

export default function ConfirmDeckDelete({
  handleSubmit,
  handleDelete,
  setToggleForm,
  editingDeck,
  setShowDeleteConfirm,
}) {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-white border border-dark rounded-2 py-6 px-6 rounded-2xl shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.2)]'
      >
        <div className='flex justify-center items-center'>
          <div className='flex flex-col justify-center gap-3'>
            <div>
              <p>
                You are about to delete the deck CS DSA along with all its
                cards. This action cannot be undone.
              </p>
              <p>Would you like to proceed?</p>
            </div>

            <div className='flex justify-between items-center'>
              <div className='text-[#1D68AA] rounded-full px-2 py-1'>
                <button
                  className='cursor-pointer underline'
                  type='button'
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setToggleForm(false);
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className='text-white bg-[#b01515] rounded-full px-2 py-1'>
                <button
                  type='submit'
                  onClick={() => {
                    handleDelete(editingDeck);
                    setShowDeleteConfirm(false);
                    setToggleForm(false);
                  }}
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
