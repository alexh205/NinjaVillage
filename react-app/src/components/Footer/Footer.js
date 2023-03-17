import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed w-full z-40 bottom-0 mt-auto border-t-4 flex flex-shrink-0 items-center justify-start pl-14 py-[10px] space-x-4 bg-gray-100 text-gray-600">
      <div className="text-md text-gray-800 text-semibold">
        <a href="https://github.com/alexh205" target="_blank" rel="noreferrer">
          ABOUT
        </a>
      </div>
      <div className="text-md text-gray-800 text-semibold">
        <a
          href="https://github.com/alexh205/Ninja_e-commerce"
          target="_blank"
          rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
