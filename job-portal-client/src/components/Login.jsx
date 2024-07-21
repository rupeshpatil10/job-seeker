import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Invalid email or password');
        } else {
          throw new Error(response.statusText);
        }
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        // Set user data to local storage
        localStorage.setItem('user', JSON.stringify(data));
        setLoggedInUser(data);
        navigate(data.isAdmin ? '/admin-dashboard' : '/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedInUser(null);
    navigate('/');
  };

  return (
    <div>
      {loggedInUser ? (
        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            {loggedInUser.isAdmin ? 'Admin Profile' : 'User Profile'}: {loggedInUser.firstName}
          </span>
          <button
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              Login
            </button>
            <p className="mt-4 text-sm text-gray-600">
              New account? <a href="/signup" className="underline text-blue-500 hover:text-blue-700">Signup</a>
            </p>
          </form>
          {error && <div className="text-red-500">{error}</div>}
        </div>
          </div>
      )}
    </div>
  );
};

export default Navbar;