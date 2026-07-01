import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import CloseButtonIcon from '../../assets/icons/CloseButtonIcon';
import MenuButtonIcon from '../../assets/icons/MenuButtonIcon';

export default function NavBar() {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className='shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.1)]'>
      <div className='mx-8 lg:mx-16 lg:py-6 pb-16 md:pb-0'>
        {isMobile ? (
          <div className='fixed left-0 right-0 bg-white flex justify-start items-center'>
            <button onClick={() => setShowNav(!showNav)} className='py-5 mx-8 flex flex-col gap-y-3'>
              {showNav ? (
                <>
                  <CloseButtonIcon />
                  <NavItems />
                </>
              ) : (
                <MenuButtonIcon />
              )}
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-3'>
            <div className='place-self-start'>
              <h1>Flashwise</h1>
            </div>
            <NavItems />
          </div>
        )}
      </div>
    </nav>
  );
}

function NavItems() {
  return (
    <ul className='md:flex md:justify-center md:items-center gap-6 text-start'>
      <li>
        <Link to={'/'} className='hover:text-[#717171]'>
          Decks
        </Link>
      </li>
      <li>
        <Link to={'/'} className='hover:text-[#717171]'>
          Stats
        </Link>
      </li>
      <li>
        <Link to={'/'} className='hover:text-[#717171]'>
          Settings
        </Link>
      </li>
    </ul>
  );
}
