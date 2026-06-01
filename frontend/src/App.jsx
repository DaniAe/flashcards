import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import CardView from './CardView';
import TableView from './TableView';
import DeckForm from './shared/components/DeckForm';

function App() {
  const [toggleForm, setToggleForm] = useState(false);
  const [changeView, setChangeView] = useState(false);
  const [decks, setDecks] = useState([]);

  let viewIconStyle = 'bi ';
  if (!changeView) viewIconStyle += 'bi-view-stacked';
  else if (changeView) viewIconStyle += 'bi-view-list';

  async function readDecks() {
    let res = await fetch('http://localhost:4000/items');
    let lstDecks = await res.json();

    console.log(lstDecks);

    setDecks(lstDecks);
  }
  useEffect(() => {
    readDecks();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newDeck = {
      name: formData.get('deck_name'),
      description: formData.get('deck_desc'),
      imgUrl: formData.get('img_url'),
    };

    const res = await fetch('http://localhost:4000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDeck),
    });

    const data = await res.json();
    console.log('Created:', data);

    readDecks();
  }

  return (
    <div className='min-vh-100 d-flex flex-column'>
      <nav className='navbar navbar-expand-lg d-flex mx-3'>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavAltMarkup'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='collapse navbar-collapse justify-content-center align-items-center py-2 px-1'
            id='navbarNavAltMarkup'
          >
            <div className='navbar-nav'>
              <Link to={'/'} className='nav-link active'>
                <i className='bi bi-book'></i> Decks
              </Link>
              {/* <a className='nav-link active' href='./index.html'></a> */}
              <a className='nav-link active' href='#'>
                <i className='bi bi-square'></i> Cards
              </a>
              <a className='nav-link active' href='#'>
                <i className='bi bi-activity'></i> Stats
              </a>
              <a className='nav-link active' href='#'>
                <i className='bi bi-gear'></i> Settings
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className='mx-3 pt-3 position-relative pb-5'>
        {/* <!-- Add new deck form --> */}
        {toggleForm && (
          <DeckForm
            handleSubmit={handleSubmit}
            setToggleForm={setToggleForm}
            addButtonName={'Create New Deck'}
          />
        )}

        {/* <!-- Filters & Add deck buttons --> */}
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <div className='d-flex gap-3 text-muted'>
            <button
              className='btn p-0'
              onClick={() => setChangeView(!changeView)}
            >
              <i className={viewIconStyle}></i>
              View
            </button>

            <button className='btn p-0'>
              <i className='bi bi-filter'></i> Sort
            </button>
            <button className='btn p-0'>
              <i className='bi bi-funnel'></i> Filter
            </button>
          </div>
          <button
            className='add-deck-button btn rounded-5'
            onClick={() => setToggleForm(true)}
          >
            <i className='bi bi-plus-lg'></i> Add Deck
          </button>
        </div>

        {/* <!-- Deck Examples --> */}
        <div>
          {changeView ? (
            <CardView decks={decks} />
          ) : (
            <TableView decks={decks} setDecks={setDecks} />
          )}
        </div>
      </main>

      <footer className='py-3 text-white mt-auto'>
        <div className='container-fluid'>
          <div className='d-md-flex justify-content-center align-items-center pb-2'>
            <h1 className='fs-4 px-md-4'>
              <i className='bi bi-lightning-charge-fill'></i> Flashwise
            </h1>
            <div className='navbar-nav flex-md-row'>
              <a className='nav-link active px-3' href='#'>
                About Us
              </a>
              <a className='nav-link active px-3' href='#'>
                Contact Us
              </a>
              <a className='nav-link active px-3' href='#'>
                Terms and Conditions
              </a>
              <a className='nav-link active px-3' href='#'>
                Policy
              </a>
            </div>
          </div>
          <div
            className='text-center pt-2'
            style={{ borderTop: '1px solid rgb(68, 68, 68)' }}
          >
            <span style={{ fontSize: '0.9rem' }}>
              © 2025 Flashwise. All rights reserved. Baltimore, MD.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
