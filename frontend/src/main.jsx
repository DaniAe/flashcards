import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './shared/styles/index.css';
import App from './app/App.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './features/decks/screens/Homepage.jsx';
import Cards from './features/cards/screens/Cards.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Homepage />} />
          <Route path='cards/:deckId' element={<Cards />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
