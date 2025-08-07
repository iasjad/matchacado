import React from 'react';

function Footer() {
  const currntYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white flex items-center justify-center px-4 h-16">
      <p className="text-center">
        Copyright &copy; {currntYear} MatchaCado - All right resarved
      </p>
    </footer>
  );
}

export default Footer;
