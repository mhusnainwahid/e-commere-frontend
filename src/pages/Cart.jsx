import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchCartProducts();
  }, [userId]);

  const fetchCartProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/getcartproducts/${userId}`);
      setCartItem(res.data.cart);
    } catch (error) {
      console.log("Error fetching cart products:", error);
    }
  };

  const removeCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/deletecartproducts/${id}`);
      alert("Item removed from cart!");
      fetchCartProducts();
    } catch (error) {
      console.log("Error deleting cart products:", error);
    }
  };

  const total = cartItem.reduce((sum, item) => {
    return item.productId ? sum + item.productId.price * item.quantity : sum;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-indigo-800 text-center drop-shadow">
        🛒 Your Shopping Cart
      </h2>

      {cartItem.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty!</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItem.map((item, index) =>
              item.productId && (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-200"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      className="w-24 h-24 rounded-xl object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition duration-200">
                        {item.productId.name}
                      </h3>
                      <p className="text-gray-500 mt-1 text-sm">
                        Quantity: <span className="font-medium">{item.quantity}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right sm:text-left">
                    <p className="text-xl font-bold text-green-600">
                      Rs {item.productId.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeCart(item._id)}
                      className="mt-2 text-sm text-red-500 hover:text-red-700 font-medium transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-12 flex justify-between items-center border-t pt-6">
            <h3 className="text-2xl font-bold text-gray-800">Total:</h3>
            <p className="text-2xl font-bold text-green-700">Rs {total}</p>
          </div>

          <button className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 rounded-2xl shadow-md transition duration-300">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
