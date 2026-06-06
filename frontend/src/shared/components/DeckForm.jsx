import CloseButtonIcon from '../../assets/icons/CloseButtonIcon';

export default function DeckForm({
  handleSubmit,
  setToggleForm,
  addButtonName,
  deckName,
  handleNameChange,
  deckDesc,
  handleDescChange,
  deckImgUrl,
  handleImgUrlChange,
}) {
  return (
    <div
      className='w-fit absolute inset-s-50 translate-x-1/2'
      id='form_container'
    >
      <form
        onSubmit={handleSubmit}
        className='bg-white border border-dark rounded-2 pt-4 pb-6 px-6 rounded-xl'
      >
        <div className='flex justify-center items-center'>
          <div className='flex flex-col justify-center items-end gap-3'>
            <div className='flex justify-self-end p-0'>
              <button
                className='text-[#b01515]'
                type='button'
                onClick={() => setToggleForm(false)}
              >
                <CloseButtonIcon />
              </button>
            </div>
            <div className=''>
              <label className='' htmlFor='deck_name'>
                Deck Name:
              </label>
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
            <div className=''>
              <label className='' htmlFor='deck_desc'>
                Deck Description:
              </label>
              <input
                className='border border-black rounded-full'
                type='text'
                name='deck_desc'
                id='deck_desc'
                value={deckDesc}
                onChange={handleDescChange}
              />
            </div>
            <div className=''>
              <label className='' htmlFor='img_url'>
                Image URL:
              </label>
              <input
                className='border border-black rounded-full'
                type='text'
                name='img_url'
                id='img_url'
                value={deckImgUrl}
                onChange={handleImgUrlChange}
              />
            </div>
            <div className=' text-white bg-black border border-black rounded-full px-2 py-1'>
              <button type='submit' className='create-new-deck'>
                {addButtonName}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
