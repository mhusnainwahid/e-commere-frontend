import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!name || !desc || !price || !image) {
        alert("Please fill all the fields!");
        return;
      }

      const imageData = new FormData();
      imageData.append('image', image);
      const userId = localStorage.getItem('userId');

      const uploadRes = await axios.post('http://localhost:8000/image', imageData);
      const uploadedImageUrl = uploadRes.data.imageUrl;
      setImageUrl(uploadedImageUrl);

      const res = await axios.post('http://localhost:8000/createproduct', {
        name,
        desc,
        price,
        imageUrl: uploadedImageUrl,
        userId
      });

      if (res.status === 200) {
        alert('Product created successfully!');
        setName('');
        setDesc('');
        setPrice('');
        setImage('');
        setImageUrl('');
        navigate('/product');
      }
    } catch (error) {
      console.log("Product creation error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Create New Product</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product title"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              rows="3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter product description"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Price (in $)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
            <input
              type="file"
              onChange={handleImage}
              className="w-full p-2 border border-gray-300 rounded-xl bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
