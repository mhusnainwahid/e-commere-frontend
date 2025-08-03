import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Products = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}getproduct`);
        // console.log("Fetched data:", res.data.product);
        setProduct(res.data.product);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  const userId = localStorage.getItem('userId')

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}addtocart`,{
        userId,
        productId,
      })
    } catch (error) {
      console.log("Error fetching products:", error);
    }
    
  }
  const handleBuyButton = async (product) =>{
    navigate('/buyproduct', {state:{ product }})
  }


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12 drop-shadow-md">
        Explore Our Exclusive Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {product.map((product) => (
          <div key={product._id} className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-3xl overflow-hidden flex flex-col">
            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={product.imageUrl || "https://via.placeholder.com/300x200"}
                alt={product.name}
                className="w-full h-52 object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-4 text-justify">
                {product.desc|| "This is a high-quality product built for modern needs. It delivers performance, durability, and satisfaction for everyday use."}
              </p>
              <p className="text-xl text-blue-600 font-semibold mb-4">${product.price}</p>
              <div className="mt-auto flex flex-col gap-3">
                <button onClick={()=> addToCart(product._id)} className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-lg hover:from-green-500 hover:to-green-600 transition-all font-medium shadow-md hover:shadow-lg">
                  Add to Cart
                </button>
                <button onClick={()=> handleBuyButton(product)} className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg">
                  View Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
