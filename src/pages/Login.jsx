import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}login`, {
        email,
        password,
      });
      if (res.status === 200) {
        const token = res.data.existUser.token;
        localStorage.setItem('token', token);
        localStorage.setItem('userId',res.data.existUser._id)
        localStorage.setItem('role',res.data.existUser.role)
        navigate('/');
      }
    } catch (error) {
      console.log('Login Failed', error);
    }
  };

  const switchToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <span
            onClick={switchToSignup}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
