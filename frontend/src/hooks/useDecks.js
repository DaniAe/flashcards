import { useState, useEffect } from 'react';

export default function useDecks() {
  const [decks, setDecks] = useState([]);
  const [decksLoading, setDecksLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  async function readDecks() {
    let res = await fetch(`${API_URL}/items`);
    let lstDecks = await res.json();

    console.log(lstDecks);

    setDecks(lstDecks);
    setDecksLoading(false);
  }

  useEffect(() => {
    readDecks();
  }, []);

  return { decks, readDecks, decksLoading };
}
