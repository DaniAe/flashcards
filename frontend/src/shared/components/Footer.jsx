export default function Footer() {
  return (
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
  );
}
