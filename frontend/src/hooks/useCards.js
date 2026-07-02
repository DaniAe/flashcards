import { useState, useEffect } from 'react';

export default function useCards() {
  const [cards, setCards] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  async function readCards() {
    let res = await fetch(`${API_URL}cards`);
    let lstCards = await res.json();

    // console.log(lstCards);

    setCards(lstCards);
    setCardsLoading(false);
  }

  useEffect(() => {
    readCards();
  }, []);

  return { cards, readCards, cardsLoading };
}
