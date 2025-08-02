import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const BuyProduct = () => {
  const location = useLocation();
  const { product } = location.state || {};

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <p className="text-center mt-20 text-red-500 font-semibold animate-pulse">
        No product found.
      </p>
    );
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) of ${product.name} to cart.`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${quantity} item(s) of ${product.name}.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:shadow-indigo-300 animate-fadeIn">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="w-full overflow-hidden rounded-2xl shadow-md">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-[400px] object-cover transition-transform duration-300 hover:scale-105 rounded-2xl"
            />
          </div>
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">{product.name}</h1>
              <p className="text-lg text-gray-600 mt-1">
                Category: <span className="text-indigo-500 font-medium">{product.category || 'General'}</span>
              </p>
              <p className="text-3xl text-green-600 font-bold mt-4">Rs {product.price}</p>
              <p className="mt-6 text-gray-700 leading-relaxed">
                {product.desc || 'No detailed description provided. This is a high-quality item, perfect for daily use!'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-gray-700 font-medium">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl transition duration-300 shadow hover:shadow-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
