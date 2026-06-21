import { useState, useEffect } from 'react';

export default function useDecks() {
  const [decks, setDecks] = useState([]);
  const [decksLoading, setDecksLoading] = useState(true);

  async function readDecks() {
    let res = await fetch('http://localhost:4000/items');
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
