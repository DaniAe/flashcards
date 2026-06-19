import { useParams } from 'react-router-dom';
import useCards from '../../../hooks/useCards';
import useDecks from '../../../hooks/useDecks';
import { useState } from 'react';
import BackArrowIcon from '../../../assets/icons/BackArrowIcon';
import { Link } from 'react-router-dom';
import ClockIcon from '../../../assets/icons/ClockIcon';
import SmileFaceIcon from '../../../assets/icons/SmileFaceIcon';
import FrownFaceIcon from '../../../assets/icons/FrownFaceIcon';
import ForwardArrowIcon from '../../../assets/icons/ForwardArrowIcon';

export default function FlashcardPage() {
  const { decks } = useDecks();
  const { cards } = useCards();

  let [currentIndex, setCurrentIndex] = useState(0);
  let [showFront, setShowFront] = useState(true);

  // check if the url & deckId are the same
  const { deckId } = useParams();
  const deck = decks.find((deck) => deck._id === deckId);
  if (!deck) {
    return <p>Deck Not Found</p>;
  }

  // check if the cards correspond to the deck in the url
  const deckCards = cards.filter((card) => card.deckId === deck?._id);

  return (
    <>
      {/* <!-- Filters & Add deck buttons --> */}
      <div className='grid grid-cols-3 items-center mx-16 py-6 mt-18'>
        <div className='flex gap-8 text-muted'>
          <Link to={'/'} className='flex items-center gap-2'>
            <BackArrowIcon size={'size-6'} /> <span>{deck.name}</span>
          </Link>
        </div>
        <div className='text-[#717171]'>
          {currentIndex + 1 <= deck.cards &&
            `Current Card: ${currentIndex + 1} / ${deck.cards}`}
        </div>
        <button className='text-[#717171] place-self-end cursor-pointer'>
          <ClockIcon />
        </button>
      </div>

      {/* Flashcard */}
      <div className='flex flex-col justify-center items-center pt-6'>
        {currentIndex + 1 > deck.cards ? (
          <>
            <div>No Cards Found in the Deck...</div>
          </>
        ) : (
          <>
            <button
              className='shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.2)] rounded-2xl w-xs h-64 flex justify-center items-center'
              onClick={() => setShowFront((prev) => !prev)}
            >
              <div>
                {showFront
                  ? deckCards[currentIndex]?.front
                  : deckCards[currentIndex]?.back}
              </div>
            </button>

            <div className='flex justify-between items-center w-xs pt-17'>
              <button
                onClick={() =>
                  currentIndex > 0
                    ? setCurrentIndex((prev) => prev - 1)
                    : setCurrentIndex(currentIndex)
                }
              >
                <BackArrowIcon size={'size-6'} />
              </button>

              <div className='flex gap-4'>
                <SmileFaceIcon />
                <FrownFaceIcon />
              </div>

              <button
                onClick={() =>
                  currentIndex + 1 < deck.cards
                    ? setCurrentIndex((prev) => prev + 1)
                    : setCurrentIndex(currentIndex)
                }
              >
                <ForwardArrowIcon size={'size-6'} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
