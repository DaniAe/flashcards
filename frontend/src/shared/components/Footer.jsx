export default function Footer() {
  return (
    <footer className='mt-auto'>
      {/* <div className='md:flex justify-center items-center'></div> */}
      <div className='text-center text-sm text-[#717171] py-2 flex justify-between border-t'>
        <div className='cursor-pointer'>
          <a className='pl-16 pr-3 hover:underline'>About Us</a>
          <a className='px-3 hover:underline'>Contact Us</a>
          <a className='px-3 hover:underline'>Terms and Conditions</a>
          <a className='px-3 hover:underline'>Policy</a>
        </div>

        <span className='px-16'>
          © 2025 Flashwise. All rights reserved. Baltimore, MD.
        </span>
      </div>
    </footer>
  );
}
