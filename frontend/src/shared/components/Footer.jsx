export default function Footer() {
  return (
    <footer className='mt-auto'>
      {/* <div className='md:flex justify-center items-center'></div> */}
      <div className='text-center text-sm text-[#717171] py-2 lg:flex justify-between border-t'>
        <div className='cursor-pointer flex flex-wrap justify-center items-center gap-x-3'>
          <a className='lg:pl-16 hover:underline'>About Us</a>
          <a className='hover:underline'>Contact Us</a>
          <a className='hover:underline'>Terms & Conditions</a>
          <a className='hover:underline'>Policy</a>
        </div>

        <span className='lg:px-16'>
          © 2025 Flashwise. All rights reserved. Baltimore, MD.
        </span>
      </div>
    </footer>
  );
}
