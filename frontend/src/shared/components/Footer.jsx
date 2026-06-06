export default function Footer() {
  return (
    <footer className='py-3 text-white bg-black mt-auto'>
      <div className=''>
        <div className='md:flex justify-center items-center pb-2'>
          <h2 className='md:px-4'>
            <i className='bi bi-lightning-charge-fill'></i> Flashwise
          </h2>
          <div className='navbar-nav flex-md-row'>
            <a className='px-3' href='#'>
              About Us
            </a>
            <a className='px-3' href='#'>
              Contact Us
            </a>
            <a className='px-3' href='#'>
              Terms and Conditions
            </a>
            <a className='px-3' href='#'>
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
  );
}
