import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get('/users');
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700 text-left">ID</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left">Username</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left">Role</th>
              <th className="py-2 px-4 border-b border-gray-700 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b border-gray-700">{user._id}</td>
                <td className="py-2 px-4 border-b border-gray-700">{user.username}</td>
                <td className="py-2 px-4 border-b border-gray-700">{user.role}</td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <button className="bg-red-500 text-white px-3 py-1 rounded mr-2">Ban</button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded">Mute</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;