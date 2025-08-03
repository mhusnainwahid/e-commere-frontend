import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UserOrderPage = () => {
  const [order, setOrder] = useState([])
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}getorders/${userId}`)
        // console.log(res.data.order)
        setOrder(res.data.order)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrders()
  }, [userId])


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Orders</h1>

      {Array.isArray(order) && order.map((order) => (
        <div
          key={order._id}
          className="bg-white hover:shadow-xl transition-shadow duration-300 rounded-2xl mb-8 p-6 border border-gray-200"
        >
          <h2 className="text-lg font-bold mb-2 text-gray-700">Order ID: {order._id}</h2>
          <p className="text-sm mb-1 text-gray-600">Total Amount: Rs {order.totalAmount}</p>
          <p className={`text-sm font-medium mb-4 ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-500'}`}>
            Status: {order.status}
          </p>

          {Array.isArray(order.items) && order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-6 mb-4 bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-colors duration-300"
            >
              <img
                src={item.imageUrl || "/placeholder.png"}
                alt={item.name || "Product"}
                className="w-24 h-24 object-cover rounded-lg shadow-sm border"
              />
              <div>
                <p className="text-base font-semibold text-gray-800 mb-1">
                  {item.name || "Product Name Not Available"}
                </p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Price: Rs {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );


}
