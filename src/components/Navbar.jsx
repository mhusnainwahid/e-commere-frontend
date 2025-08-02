import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-blue-600">
          ShopEasy
        </Link>
        <div className="space-x-6 text-base hidden md:flex items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link to="/product" className="text-gray-700 hover:text-blue-600 transition">Products</Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600 transition">Cart</Link>
          <Link to="/userprofile" className="text-gray-700 hover:text-blue-600 transition">Your Profile</Link>
          <Link to="/orders" className="text-gray-700 hover:text-blue-600 transition">Orders</Link>
          <Link to="/yourproducts" className="text-gray-700 hover:text-blue-600 transition">Your Products</Link>
          <Link to="/createproduct" className="text-gray-700 hover:text-blue-600 transition">Create Product</Link>
          <button onClick={logOut} className="text-gray-700 hover:text-red-500 transition">Logout</button>
        </div>
        <div className="md:hidden">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
