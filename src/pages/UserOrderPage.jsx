import axios from 'axios'
import React, { useEffect } from 'react'

export const UserOrderPage = () => {
  const orders = [
    {
      _id: 'order789',
      product: {
        name: 'Black Shoes',
        image: 'https://via.placeholder.com/100'
      },
      quantity: 1,
      totalAmount: 3500,
      status: 'Delivered'
    },
    {
      _id: 'order101',
      product: {
        name: 'Denim Jacket',
        image: 'https://via.placeholder.com/100'
      },
      quantity: 2,
      totalAmount: 5600,
      status: 'Pending'
    }
  ]

  const userId = localStorage.getItem("userId")

  useEffect(()=>{
    const fetchOrders = async()=>{
      try {
        const orders = await axios.get(`${import.meta.env.VITE_BASE_URL}getorders/${userId}`)
        console.log(orders)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrders()
  },[userId])


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="bg-white shadow-md rounded-xl mb-6 p-4 border">
          <div className="flex items-center space-x-4">
            <img src={order.product.image} alt="Product" className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{order.product.name}</h2>
              <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
              <p className="text-sm text-gray-600">Total: Rs {order.totalAmount}</p>
              <p className={`text-sm font-medium mt-1 ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-500'}`}>
                Status: {order.status}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
