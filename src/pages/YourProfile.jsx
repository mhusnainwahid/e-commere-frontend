import React, { useEffect, useState } from 'react';
import axios from 'axios'

const YourProfile = () => {
  const [user, setUser] = useState({
    name: 'Ali Raza',
    email: 'ali.raza@example.com',
    role: 'vendor',
    bio: 'Passionate about selling digital products.',
    image: '../assets/login img.jpg',
  });

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [role,setRole] = useState('')
  const [bio,setBio] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);


  const userId = localStorage.getItem("userId")
  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        const existUser = await axios.get(`http://localhost:8000/getauser/${userId}`)
        // console.log(existUser.data.user)
        setName(existUser.data.user.name)
        setEmail(existUser.data.user.email)
        setRole(existUser.data.user.role)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  },[userId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <img
            src={'https://via.placeholder.com/150'}
            alt="User Profile"
            className="w-28 h-28 rounded-full object-cover shadow-lg"
          />
          <h2 className="text-2xl font-semibold mt-4 text-gray-800">Your Profile</h2>
        </div>

        <div className="space-y-5 text-gray-700">
          <div>
            <label className="block text-sm text-gray-500">Name</label>
            <p className="font-medium text-lg">{name}</p>
          </div>

          <div>
            <label className="block text-sm text-gray-500">Email</label>
            <p className="font-medium text-lg">{email}</p>
          </div>

          <div>
            <label className="block text-sm text-gray-500">Role</label>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
              role === 'vendor' ? 'bg-yellow-100 text-yellow-700' :
              role === 'admin' ? 'bg-red-100 text-red-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {role}
            </span>
          </div>

          <div>
            <label className="block text-sm text-gray-500">Bio</label>
            <p className="font-medium text-base">{user.bio}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold">Edit Profile</h3>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourProfile;
