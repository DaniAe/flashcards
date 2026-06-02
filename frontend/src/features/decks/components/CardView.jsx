import deckImg1 from '../../../assets/images/deckImg1.jpg';
import deckImg2 from '../../../assets/images/deckImg2.jpg';
import deckImg3 from '../../../assets/images/deckImg3.jpg';

export default function CardView({ decks, editDeck, handleDelete }) {
  return (
    <div className='deck-container mt-5'>
      <div className='row g-4 justify-content-start'>
        {decks.map((deck) => (
          <div key={deck._id} className='col-12 col-sm-6 col-lg-4'>
            <div className='deck rounded-2 p-3'>
              {/* <img
                src={deckImg1}
                alt='Language Image'
                className='mb-2 rounded-2'
              /> */}
              <p className='deck-name mb-0 pt-3 pb-2'>{deck.name}</p>
              <p className='pt-2'>{deck.cards}</p>
            </div>
            <div>
              <a onClick={() => editDeck(deck)}>
                <i className='bi bi-pencil-square text-primary'></i>
              </a>
              &nbsp;
              <a onClick={() => handleDelete(deck)}>
                <i className='bi bi-trash-fill text-danger'></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
