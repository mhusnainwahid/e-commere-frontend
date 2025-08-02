import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const switchToProduct = ()=>{
    navigate('/product')
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6">
          Welcome to ShopEasy
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl">
          Discover the best deals on electronics, fashion, accessories, and more.
          ShopEasy makes your online shopping effortless, fast, and secure. Browse
          our wide selection of products and experience a seamless shopping journey.
        </p>
        <button onClick={switchToProduct} className="mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
          Start Shopping
        </button>
      </main>
    </div>
  );
};

export default Home;
