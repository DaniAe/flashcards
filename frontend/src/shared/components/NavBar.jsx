import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
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
  );
}
