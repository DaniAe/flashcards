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
      className='container my-5 position-absolute start-50 translate-middle-x'
      id='form_container'
    >
      <div className='row justify-content-center'>
        <div className='col-12 col-md-6'>
          <form
            onSubmit={handleSubmit}
            className='py-3 bg-white border border-dark rounded-2 pb-4'
          >
            <div className='row justify-content-center'>
              <div className='col-10 d-flex justify-content-end p-0'>
                <button
                  type='button'
                  className='btn btn-block rounded-5'
                  style={{ color: '#b01515' }}
                  onClick={() => setToggleForm(false)}
                >
                  <i className='bi bi-x-lg'></i>
                </button>
              </div>
              <div className='col-10'>
                <label className='col-form-label' htmlFor='deck_name'>
                  Deck Name:
                </label>
                <input
                  className='form-control'
                  type='text'
                  name='deck_name'
                  id='deck_name'
                  value={deckName}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className='col-10'>
                <label className='col-form-label' htmlFor='deck_desc'>
                  Deck Description:
                </label>
                <input
                  className='form-control'
                  type='text'
                  name='deck_desc'
                  id='deck_desc'
                  value={deckDesc}
                  onChange={handleDescChange}
                />
              </div>
              <div className='col-10'>
                <label className='col-form-label' htmlFor='img_url'>
                  Image URL:
                </label>
                <input
                  className='form-control'
                  type='text'
                  name='img_url'
                  id='img_url'
                  value={deckImgUrl}
                  onChange={handleImgUrlChange}
                />
              </div>
              <div className='col-10 mt-4 d-flex justify-content-end'>
                <button
                  type='submit'
                  className='create-new-deck btn btn-block text-white bg-black rounded-5'
                >
                  {addButtonName}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
