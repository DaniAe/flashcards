import '../App.css';
import NavBar from '../shared/components/NavBar';
import Footer from '../shared/components/Footer';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function App() {
  const { pathname } = useLocation();

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      {pathname.includes('/flashcards') ? (
        <Outlet />
      ) : (
        <>
          <NavBar />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
