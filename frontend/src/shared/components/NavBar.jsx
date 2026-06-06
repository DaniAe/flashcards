import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import CloseButtonIcon from '../../assets/icons/CloseButtonIcon';

export default function NavBar() {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className=''>
      <div className=''>
        <div className='pt-2'>
          {isMobile ? (
            <div className='flex justify-start items-center'>
              <button onClick={() => setShowNav(!showNav)}>
                {showNav ? (
                  <>
                    <CloseButtonIcon />
                    <NavItems />
                  </>
                ) : (
                  <MenuButton />
                )}
              </button>
            </div>
          ) : (
            <div className='flex md:justify-center md:items-center'>
              <NavItems />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavItems() {
  return (
    <ul className='md:flex gap-4 text-start'>
      <li>
        <Link to={'/'} className='hover:underline'>
          Decks
        </Link>
      </li>
      <li>
        <Link to={'/'} className='hover:underline'>
          Cards
        </Link>
      </li>
      <li>
        <Link to={'/'} className='hover:underline'>
          Stats
        </Link>
      </li>
      <li>
        <Link to={'/'} className='hover:underline'>
          Settings
        </Link>
      </li>
    </ul>
  );
}

function MenuButton() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='size-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
      />
    </svg>
  );
}
