import { useState, useEffect } from 'react';

export default function useDecks() {
  const [decks, setDecks] = useState([]);

  async function readDecks() {
    let res = await fetch('http://localhost:4000/items');
    let lstDecks = await res.json();

    console.log(lstDecks);

    setDecks(lstDecks);
  }

  useEffect(() => {
    readDecks();
  }, []);

  return { decks, readDecks };
}
