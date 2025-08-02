import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} ShopEasy. All rights reserved.</p>
        <p className="text-xs mt-1">Built with ❤️ using MERN Stack</p>
      </div>
    </footer>
  );
};

export default Footer;
