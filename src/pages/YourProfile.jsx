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

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [bio, setBio] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [image, setImage] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleImage = (e) => {
    setImage(e.target.files[0])
  }
  const userId = localStorage.getItem("userId")
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const existUser = await axios.get(`${import.meta.env.VITE_BASE_URL}getauser/${userId}`)
        // console.log(existUser.data.user)
        setName(existUser.data.user.name)
        setEmail(existUser.data.user.email)
        setRole(existUser.data.user.role)
        setBio(existUser.data.user.bio)
        setImageUrl(existUser.data.user.imageUrl)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [userId])

  const isModal = () => {
    setIsModalOpen(true)
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    // console.log(name,email,bio,image)
    try {

      const imageData = new FormData();
      imageData.append('image', image);
      const uploadRes = await axios.post(`${import.meta.env.VITE_BASE_URL}userimage`, imageData);
      // console.log(uploadRes.data.imageUrl)
      setImageUrl(uploadRes.data.imageUrl);
      const res = await axios.put(`${import.meta.env.VITE_BASE_URL}editauser/${userId}`, {
        name,
        email,
        bio,
        imageUrl
      })
      if (res === 200) {
        alert("Profile update succesully!")
      }
      setIsModalOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="User Profile"
              className="w-28 h-28 rounded-full object-cover shadow-lg"
            />
          )}

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
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${role === 'vendor' ? 'bg-yellow-100 text-yellow-700' :
              role === 'admin' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              }`}>
              {role}
            </span>
          </div>

          <div>
            <label className="block text-sm text-gray-500">Bio</label>
            <p className="font-medium text-base">{bio}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={isModal}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <form onSubmit={handleEdit}>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 md:p-8 transition-all">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Update Product</h2>

              <div className="space-y-4">
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Product Name"
                />
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
                <label className="block text-gray-700 font-semibold mb-2">Bio</label>
                <input
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="bio"
                  type="text"
                />
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Your Image</label>
                  <input
                    type="file"
                    onChange={handleImage}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default YourProfile;
