import '../App.css';
import NavBar from '../shared/components/NavBar';
import Footer from '../shared/components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-white'>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
