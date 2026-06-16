import { useState, useEffect } from 'react';

export default function useCards() {
  const [cards, setCards] = useState([]);

  async function readCards() {
    let res = await fetch('http://localhost:4000/cards');
    let lstCards = await res.json();

    // console.log(lstCards);

    setCards(lstCards);
  }

  useEffect(() => {
    readCards();
  }, []);

  return { cards, readCards };
}
