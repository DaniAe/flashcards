import EditIcon from '../../../assets/icons/EditIcon';
import TrashIcon from '../../../assets/icons/TrashIcon';
import deckImg1 from '../../../assets/images/deckImg1.jpg';
import deckImg2 from '../../../assets/images/deckImg2.jpg';
import deckImg3 from '../../../assets/images/deckImg3.jpg';

export default function CardView({ decks, editDeck, handleDelete }) {
  return (
    <div className=''>
      <div className='grid grid-cols-5 gap-8'>
        {decks.map((deck) => (
          <div
            key={deck._id}
            className='rounded-xl shadow-[0_0.1rem_0.5rem_rgba(0,0,0,0.2)]'
          >
            <div className='rounded-2 p-3 flex flex-col justify-center items-center'>
              <img
                src={deckImg1}
                alt='Language Image'
                className='mb-2 rounded-2'
              />
              <p className='deck-name'>{deck.name}</p>
              <p className=''>{deck.cards}</p>
              <div className='flex'>
                <a onClick={() => editDeck(deck)}>
                  <EditIcon />
                </a>
                &nbsp;
                <a onClick={() => handleDelete(deck)}>
                  <TrashIcon />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
