import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import API from '../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);
      // Assuming admin login is successful and returns user data with a role
      if (data.role === 'admin') {
        login(data);
        navigate('/');
      } else {
        console.error('Not an admin user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center">Admin Login</h1>
      <form onSubmit={onSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label className="block text-white">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;